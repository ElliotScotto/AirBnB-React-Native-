import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { EvilIcons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import generateStars from "../components/GenerateStars";

export default function RoomScreen({ route }) {
  //valeurs récupérées de HomeScreen
  const roomId = route.params.id;
  const priceRoom = route.params.price;
  const title = route.params.title;
  const ratingValue = route.params.ratingValue;
  const reviews = route.params.reviews;
  const avatar = route.params.avatar;
  const descriptionRoom = route.params.description;
  //

  const [data, setData] = useState();
  const navigation = useNavigation();
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(Dimensions.get("window"));
  useEffect(() => {
    try {
      const fetchRooms = async () => {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
        );
        // console.log("RESPONSE.DATA ==> ", response.data);
        // console.log("roomId ===> ", roomId);
        // console.log("description ===> ", descriptionRoom);

        setRoom(response.data);
        setIsLoading(false);
      };

      fetchRooms();
    } catch (error) {
      console.log("ERROR ==> ", error);
    }
  }, []);
  return isLoading === true ? (
    <ActivityIndicator
      style={styles.activityIndicator}
      size="large"
      color="pink"
      marginTop={100}
      justifyContent="center"
      alignItems="center"
    />
  ) : (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <View style={styles.cardTop}>
        <Swiper
          style={{ height: 300 }}
          dotColor="pink"
          activeDotColor="red"
          autoplay
        >
          {room.photos.map((slide) => {
            return (
              <View style={styles.slide} key={slide.picture_id}>
                <Image
                  source={{ uri: slide.url }}
                  style={{ height: 300, width: "100%" }}
                />
              </View>
            );
          })}
        </Swiper>
        <View style={styles.roomPrice}>
          <Text style={styles.priceFont}>{priceRoom} €</Text>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.roomInfos}>
          <View style={styles.titleRoom}>
            <Text numberOfLines={1} style={styles.titleFont}>
              {title}
            </Text>
          </View>
          <View style={styles.roomRates}>
            <View style={styles.stars}>
              <Text>{generateStars(ratingValue)}</Text>
            </View>
            <View style={styles.roomReviews}>
              <Text style={styles.fontReviews}>{reviews} reviews</Text>
            </View>
          </View>
        </View>
        <View style={styles.avatar}>
          <Image
            borderRadius={"50%"}
            style={styles.avatarImg}
            source={{ uri: avatar }}
          />
        </View>
      </View>

      <View style={styles.description}>
        <Text numberOfLines={3} style={styles.fontDescription}>
          {descriptionRoom}
        </Text>
      </View>
    </>
  );
}
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  cardTop: {
    height: heightScreen * 0.25,
    position: "relative",
  },
  cardBottom: {
    marginTop: 15,
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 15,
  },

  titleFont: { fontSize: 20 },
  roomPrice: {
    height: 50,
    width: "25%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
  },
  priceFont: { color: "white", fontSize: 20 },
  roomInfos: {
    flex: 3,
  },
  titleRoom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roomRates: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flex: 1,
    flexDirection: "row",
  },
  roomReviews: {
    flex: 1,
  },
  fontReviews: { color: "grey" },
  avatar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  avatarImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    // borderRadius: "50%",//Ne fonctionne que sur ios
  },
  description: { paddingLeft: 10, paddingRight: 10 },
  fontDescription: { fontSize: 16, lineHeight: 22 },
});
