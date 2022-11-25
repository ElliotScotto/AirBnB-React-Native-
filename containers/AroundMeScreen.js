import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import * as Location from "expo-location";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

function AroundMeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let response;
        if (status === "granted") {
          // On affiche les chambres des utilisateurs de la requête
          const location = await Location.getCurrentPositionAsync();

          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
        } else {
          // On affiche toutes les chambres dispos
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }

        const userMarkerTab = [];
        for (let i = 0; i < response.data.length; i++) {
          userMarkerTab.push({
            latitude: response.data[i].location[1],
            longitude: response.data[i].location[0],
            id: response.data[i]._id,
          });
        }

        setData(userMarkerTab);
        setIsLoading(false);
      } catch (error) {
        alert("An error occurred");
      }
    };

    getLocationAndData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size="large"
      color="pink"
      marginTop={100}
      justifyContent="center"
      alignItems="center"
    />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        {data.map((item, index) => {
          return (
            <Marker
              onPress={() => {
                navigation.navigate("Room", {
                  id: item.id,
                });
              }}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            ></Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}

export default AroundMeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
