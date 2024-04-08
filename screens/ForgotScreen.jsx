import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { auth } from '../config';
import { Feather } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { COLORS } from "../constants";

const ForgotScreen = () => {

    const [email, setEmail] = useState("");

    const handlePassword = async () => {
        await sendPasswordResetEmail(auth, email)
        .then(() => alert("password reset email sent 🚀"))
        .catch((error) => console.log(error.message));
    };


  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
        <Image
            source={require('../assets/images/forgot.png')}
            style={{ width: 300, height: 220 }}
        />
        </View>

        <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        >
        <View>
            <Text style={styles.text}>Forgot your password?</Text>
        </View>
        <View style={styles.emailContainer}>
            <Feather name="mail" size={20} color="gray" style={{ marginLeft: 15 }} />
            <TextInput
            style={styles.input}
            placeholder="Enter email address here"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePassword}>
            <Text style={styles.send}>Send password reset link</Text>
        </TouchableOpacity>
        <View style={styles.spam}>
            <Text style={{ fontSize: 12, color: COLORS.gray, fontWeight: "400" }}>
            Check your email spam folder to find password reset link
            </Text>
        </View>
        </ScrollView>
    </View>
  )
}

export default ForgotScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: "8%",
      },
      imageContainer: {
        marginTop: 55,
      },
      emailContainer: {
        marginTop: 15,
        width: "100%",
        height: 50,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      input: {
        flex: 1,
        color: COLORS.black,
        fontSize: 16,
        paddingHorizontal: 7,
        justifyContent: "center",
        alignItems: "center",
      },
      buttonContainer: {
        marginTop: "5%",
        width: "100%",
        height: 50,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 10,
      },
      send: {
        color: COLORS.lightWhite,
        fontSize: 18,
      },
      spam: {
        marginTop: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      },
      text: {
        fontSize: 17,
        fontWeight: '800',
        color : COLORS.greenJungle
      },
      formContainer: {
        width: "100%",
      },
})