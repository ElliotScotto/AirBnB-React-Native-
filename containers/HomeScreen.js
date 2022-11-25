import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native";
import generateStars from "../components/GenerateStars";
//
//
export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  //Pas de UseEffect sur une page Login & Signup car la requête doit se lancer au bouton sur ces pages.
  // Dans ce cas présent de la Home, non.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms`
        );
        console.log("RESPONSE.DATA ==> ", response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log("error ==> ", error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size="large"
      color={"pink"}
    />
  ) : (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate("Room", {
                  id: item._id,
                  title: item.title,
                  price: item.price,
                  ratingValue: item.ratingValue,
                  reviews: item.reviews,
                  avatar: item.user.account.photo.url,
                  description: item.description,
                  latitude: item.location[1],
                  longitude: item.location[0],
                });
              }}
            >
              <View style={styles.cardTop}>
                <View style={styles.roomPhoto}>
                  <ImageBackground
                    style={styles.bgImage}
                    source={{ uri: item.photos[0].url }}
                  >
                    <View style={styles.roomPrice}>
                      <Text style={styles.priceFont}>{item.price} €</Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <View style={styles.roomInfos}>
                  <View style={styles.titleRoom}>
                    <Text numberOfLines={1} style={styles.titleFont}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.roomRates}>
                    <View style={styles.stars}>
                      <Text>{generateStars(item.ratingValue)}</Text>
                    </View>
                    <View style={styles.roomReviews}>
                      <Text style={styles.fontReviews}>
                        {item.reviews} reviews
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.avatar}>
                  <Image
                    style={
                      Platform.OS === "ios"
                        ? styles.avatarImg
                        : styles.avatarImgAndroid
                    }
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  homeContainer: {
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
  logoHome: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 40,
  },
  card: {
    width: 400,
    height: 300,
    marginBottom: 30,
  },
  bgImage: { flex: 1, justifyContent: "flex-end" },
  cardTop: {
    height: 200,
  },
  cardBottom: {
    marginTop: 15,
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  roomPhoto: { height: 200, position: "relative" },
  titleFont: { fontSize: 20 },
  roomPrice: {
    height: 50,
    width: "25%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 140,
    left: 0,
  },
  priceFont: { color: "white", fontSize: 20 },
  roomInfos: {
    flex: 3,
  },
  titleRoom: {
    flex: 1,
  },
  roomRates: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
  },
  roomReviews: {
    marginLeft: 10,
    flex: 1,
  },
  fontReviews: { color: "grey" },
  avatar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
  avatarImg: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: "50%", //Ne fonctionne que sur ios
  },
  avatarImgAndroid: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
});
