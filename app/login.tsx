import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext); // Access context values
  const router = useRouter(); // Hook for navigation

  const handleLogin = () => {
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

    // Basic email validation
    if (!email) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    // Basic password validation
    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors); // Update error state

    if (formValid) {
      // Check if credentials match with context values
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true); // Update authentication status
        router.push("/home"); // Redirect to home page
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" }); // Show error if credentials don't match
      }
    }
  };

  return (
    <View
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logo Replacement with Text */}
        <View style={styles.logoContainer}>
          <Text style={styles.medicText}>COVID-19 Stats 🌍</Text>
          <Text style={styles.tagline}>Stay Informed, Stay Safe.</Text>
        </View>
        {/* Input Fields */}
        <TextInput
          placeholderTextColor="#888"
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          placeholderTextColor="#888"
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {/* Footer Text */}
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.link}>
            <Link href="/">Sign Up</Link>
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent white
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  medicText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#800080", // Purple color
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    fontStyle: "italic",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#800080", // Purple border
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F5F5F5",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#800080", // Purple background
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#800080", // Purple link
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
