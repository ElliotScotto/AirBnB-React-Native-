import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Dimensions,
} from "react-native";

export default function ProfileScreen({ userToken, setToken, userId, setId }) {
  const { params } = useRoute();
  setId = { userId }; //{id} => "835"
  //States
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  return (
    <>
      <View style={{ alignItems: "center" }}>
        {/* <Text>user id :{id}</Text> */}
      </View>
      <View style={styles.SafeAreaViewStyle}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <KeyboardAwareScrollView>
          <View style={styles.signinContainer}>
            <View style={styles.avatarUpload}>
              <View
                style={[
                  styles.avatarUser,
                  Platform.OS === "ios"
                    ? styles.avatarImgIOSUser
                    : styles.avatarImgAndroidUser,
                ]}
              >
                <View style={styles.imgAvatarUser}>
                  <FontAwesome5 name="user-alt" size={125} color="lightgrey" />
                </View>
              </View>
              <View style={styles.btnsStyle}>
                <TouchableOpacity style={styles.btnStyle}>
                  <MaterialIcons name="photo-library" size={42} color="grey" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle}>
                  <MaterialIcons name="photo-camera" size={42} color="grey" />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.customInputSignIn}
              autoCapitalize="none"
              placeholder="email"
              onChangeText={(email) => {
                setEmail(email);
              }}
              keyboardType={"email-address"}
            />
            <TextInput
              style={styles.customInputSignIn}
              autoCapitalize="none"
              placeholder="username"
              onChangeText={(username) => {
                setUsername(username);
              }}
            />
            <TextInput
              style={[styles.customInputSignIn, styles.descriptionInput]}
              multiline={true}
              numberOfLines="4"
              autoCapitalize="none"
              placeholder="Describe yourself in few words"
              onChangeText={(description) => {
                setDescription(description);
              }}
            />

            <Text style={styles.ErrorMessageStyle}>{errorMessage}</Text>
            <TouchableHighlight
              style={styles.button}
              title="Sign up"
              // onPress={handlePress}
            >
              <Text style={[styles.grey, styles.large]}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              title="Sign up"
              onPress={() => {
                setToken(null);
                setId(null);
              }}
            >
              <Text style={[styles.grey, styles.large]}>Logout</Text>
            </TouchableHighlight>
            <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate("SignIn");
            // }}
            ></TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  signinContainer: { alignItems: "center" },
  SafeAreaViewStyle: { paddingTop: 40, backgroundColor: "#ffffff", flex: 1 },
  avatarUser: {
    borderColor: "#FFBAC0",
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imgAvatarUser: {},
  avatarImgIOSUser: {
    borderRadius: "100%", //Ne fonctionne que sur ios
  },
  avatarImgAndroidUser: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatarUpload: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnsStyle: {
    height: "100%",
    marginLeft: 20,
  },
  btnStyle: {
    flex: 1,
    justifyContent: "center",
  },

  customInputSignIn: {
    height: 40,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: "80%",
    marginBottom: 30,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderStyle: "solid",
  },
  button: {
    height: 60,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EB5A62",
    borderWidth: 3,
    borderRadius: 60,
    marginBottom: 20,
  },
  text: {
    color: "#717171",
    fontWeight: "500",
    fontSize: 18,
  },
  grey: { color: "#717171" },
  large: { fontSize: 18 },
  ErrorMessageStyle: { marginTop: 10, color: "#F95A5F", marginBottom: 15 },
});
