import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
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
import { Feather } from "@expo/vector-icons";
// import { TouchableHighlight } from "react-native-web";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();
  //
  const handlePress = async (event) => {
    event.preventDefault();
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      try {
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/log_in`,
          {
            email,
            password,
          }
        );
        // console.log(response.data.token);
        // console.log(response.data.id);
        if (response.data.token && response.data.id) {
          const token = response.data.token;
          const id = response.data.id;
          setToken(token);
          // setToken(userToken);
          setId(id);
          alert("Votre inscription s'est bien déroulé");
        } else {
          setErrorMessage("Echec de connexion");
        }
      } catch (error) {
        // console.log(error.response.status);
        if (email === null) {
          setErrorMessage("Cette adresse email n'existe pas");
        }
        if (!id) {
          setErrorMessage(
            "L'adresse email et le mot de passe ne correspondent pas"
          );
        }
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
          <Text style={[styles.grey, styles.titlePage]}>Sign in</Text>
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
            style={[styles.customInputSignIn, styles.passwordInput]}
            autoCapitalize="none"
            placeholder="password"
            secureTextEntry={secureTextEntry}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => {
              if (secureTextEntry) {
                setSecureTextEntry(false);
              } else if (!secureTextEntry) {
                setSecureTextEntry(true);
              }
              //
            }}
          >
            {secureTextEntry ? (
              <Text>
                <Feather name="eye-off" size={24} color="black" />
              </Text>
            ) : (
              <Text>
                <Feather name="eye" size={24} color="black" />
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.ErrorMessageStyle}>{errorMessage}</Text>
          <TouchableHighlight
            style={styles.button}
            title="Sign in"
            onPress={handlePress}
          >
            <Text style={[styles.grey, styles.large]}>Sign in</Text>
          </TouchableHighlight>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.grey}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signinContainer: { alignItems: "center", marginVertical: 20 },
  SafeAreaViewStyle: { backgroundColor: "#ffffff", flex: 1 },
  titlePage: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 70,
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
  passwordInput: { position: "relative" },
  eyeIcon: { position: "absolute", bottom: 265, right: 50 },
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
  ErrorMessageStyle: { marginTop: 100, color: "#F95A5F", marginBottom: 15 },
});
