import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { TouchableHighlight } from "react-native-web";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();
  //
  const handlePress = async (event) => {
    event.preventDefault();
    if (email && username && description && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      try {
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/sign_up`,
          {
            email,
            username,
            description,
            password,
          }
        );
        // setToken();
        console.log(response);
      } catch (error) {
        // console.log(error.response.status);
        if (error.response.status === 401) {
          setErrorMessage("Accès non autorisé");
        }
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  //
  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <KeyboardAwareScrollView>
        <View style={styles.signinContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
            resizeMode={"contain"}
          />
          <Text style={[styles.grey, styles.titlePage]}>Sign up</Text>
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
          <TextInput
            style={styles.customInputSignIn}
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          <TextInput
            style={styles.customInputSignIn}
            autoCapitalize="none"
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword);
            }}
          />

          <Text style={styles.ErrorMessageStyle}>{errorMessage}</Text>
          <TouchableHighlight
            style={styles.button}
            title="Sign up"
            onPress={handlePress}
          >
            <Text style={[styles.grey, styles.large]}>Sign up</Text>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.grey}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signinContainer: { alignItems: "center" },
  SafeAreaViewStyle: { backgroundColor: "#ffffff", flex: 1 },
  titlePage: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 10,
  },
  logo: { height: 100, width: 100 },
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
    borderWidth: 1,
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
