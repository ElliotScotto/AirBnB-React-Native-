import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  ImageBackground,
  Button,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native";
// import { ScrollView } from "react-native-web";
import { EvilIcons } from "@expo/vector-icons";
// import DisplayStars from "./components/DisplayStars";
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
        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
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
      <Image
        style={styles.logoHome}
        source={require("../assets/logo.png")}
        resizeMode={"contain"}
      />
      {/* <ScrollView style={styles.scrollView}> */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate("room");
              }}
            >
              <View style={styles.cardTop}>
                <View style={styles.roomPhoto}>
                  <ImageBackground
                    style={styles.bgImage}
                    source={{ uri: item.photos[0].url }}
                  >
                    {/* <View> */}
                    <View style={styles.roomPrice}>
                      <Text style={styles.priceFont}>{item.price} €</Text>
                    </View>
                    {/* </View> */}
                  </ImageBackground>
                  {/* <Text>coucou</Text> */}
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
                      <Text>
                        <EvilIcons
                          style={styles.iconStar}
                          name="star"
                          size={24}
                          color="black"
                        />
                      </Text>
                      <Text>{item.ratingValue}</Text>
                    </View>
                    <View style={styles.roomReviews}>
                      <Text>{item.reviews} reviews</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.avatar}>
                  <Image source={{ uri: item.user.account.url }} />
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
  homeContainer: { alignItems: "center" },
  logoHome: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 40,
  },
  card: {
    width: 400,
    height: 300,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
  },
  bgImage: { flex: 1, justifyContent: "flex-end" },
  cardTop: {
    height: 200,
    borderWidth: 1,
    borderColor: "pink",
    borderStyle: "solid",
  },
  cardBottom: {
    height: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    flexDirection: "row",
  },
  roomPhoto: { height: 200, position: "relative" },
  titleFont: { fontSize: 20 },
  roomPrice: {
    height: 50,
    width: "25%",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 140,
    left: 0,
  },
  priceFont: { color: "white", fontSize: 20 },
  roomInfos: {
    flex: 3,
    borderWidth: 1,
    borderColor: "purple",
    borderStyle: "solid",
  },
  titleRoom: {
    flex: 1,
    borderWidth: 1,
    borderColor: "pink",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  roomRates: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "purple",
    borderStyle: "solid",
    alignItems: "center",
  },
  stars: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gold",
    borderStyle: "solid",
    flexDirection: "row",
  },
  iconStar: {
    // fill: "yellow",
  },
  roomReviews: {
    flex: 1,
    borderWidth: 1,
    borderColor: "green",
    borderStyle: "solid",
  },
  avatar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "blue",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
});
