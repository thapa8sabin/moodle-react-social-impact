import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      // Mock auth (replace with Moodle API call)
      navigation.navigate("CourseList" as never);
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <Text style={styles.title}>Student Login</Text>
      <View style={{ backgroundColor: "#F5F5F5" }}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 64,
    marginBottom: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  formView: {
    backgroundColor: "#F3F0F0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#2C2C2C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#F5F5F5",
    fontSize: 18,
  },
});

export default Login;
