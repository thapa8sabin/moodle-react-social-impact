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
import { useAuth } from "../context/AuthContext";
import { getUserDetails, login } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const { token, setToken, user, setUser } = useAuth();

  if (token) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          You are already logged in as {user?.fullname}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CourseList" as never)}
        >
          <Text style={styles.buttonText}>Go to Courses</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      login(username, password).then(async (token) => {
        setToken(token);
        const user = await getUserDetails(token);
        setUser(user);
        navigation.navigate("CourseList" as never);
      });
    } catch (error) {
      // Error already alerted in api.ts
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <Text style={styles.title}>Student Login</Text>
      <View style={{ backgroundColor: "#F5F5F5" }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          accessible={true}
          accessibilityLabel="Enter your username provided by your institution"
          accessibilityHint="Username for login"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "LOGIN"}
          </Text>
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
  disabled: {
    backgroundColor: "#ccc",
  },
});

export default Login;
