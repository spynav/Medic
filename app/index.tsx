import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Index() {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext); // Access context functions
  const router = useRouter(); // Hook for navigation

  const handleSignUp = () => {
    setYourName(name);
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

    // Basic name validation
    if (!name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

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
      // Save email and password in context
      setUserEmail(email);
      setUserPassword(password);
      console.log("Form submitted successfully");
      router.push("/login"); // Navigate to login page
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Replacement with Text */}
      <View style={styles.logoContainer}>
        <Text style={styles.medicText}>COVID-19 Stats 🌍</Text>
        <Text style={styles.tagline}>Stay Informed, Stay Safe.</Text>
      </View>
      {/* Input Fields */}
      <TextInput
        placeholderTextColor="#888"
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Footer Text */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.link}>
          <Link href="/login">Login</Link>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent", // Transparent to allow gradient
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject, // Ensures the gradient fills the screen
    backgroundColor: "transparent",
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
    fontStyle:"italic",
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

