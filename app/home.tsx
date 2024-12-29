import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

type CovidStatistics = {
  country: string;
  cases: {
    active: number;
    critical: number;
    new: string | null;
    recovered: number;
    total: number;
  };
  deaths: {
    new: string | null;
    total: number;
  };
  population: number;
  day: string;
};

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext); // Use context for managing click count
  const [statistics, setStatistics] = useState<CovidStatistics[]>([]);

  // Fetch COVID-19 statistics from the API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("https://covid-193.p.rapidapi.com/statistics", {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "e7e85f811amshf6fb4349343602cp11e8dbjsne9a5e624269f",
            "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
          },
        });

        const data = await response.json();
        const firstTenCountries = data.response.slice(0, 50); // Get the first 50 countries
        setStatistics(firstTenCountries);
      } catch (error) {
        console.error("Error fetching COVID-19 statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  // Handle item clicks
  const handleItemClick = () => {
    setClickCount(clickCount + 1); // Update click count using context
  };

  return (
    <View style={styles.container}>
      {/* Medic Heading */}
      <View style={styles.medicWrapper}>
        <Text style={styles.medicHeading}>COVID-19 Stats 🌍</Text>
      </View>

      {/* Welcome Message and Click Counter */}
      <View style={styles.headerWrapper}>
        <Text style={styles.welcomeText}>Hello {yourName} 👋🏻</Text>
        <View style={styles.counterWrapper}>
          <Text style={styles.notificationIcon}>💜</Text>
          <Text style={styles.clickCounterText}>{clickCount}</Text>
        </View>
      </View>

      {/* Statistics List */}
      <FlatList
        data={statistics}
        keyExtractor={(item) => item.country}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.country}</Text>
              <Text style={styles.cardDescription}>
                Active Cases: {item.cases.active}
              </Text>
              <Text style={styles.cardDescription}>
                Critical Cases: {item.cases.critical}
              </Text>
              <Text style={styles.cardDescription}>
                New Cases: {item.cases.new || "No new cases"}
              </Text>
              <Text style={styles.cardDescription}>
                Total Recovered: {item.cases.recovered}
              </Text>
              <Text style={styles.cardDescription}>
                Total Deaths: {item.deaths.total}
              </Text>
              <Text style={styles.cardDescription}>
                Population: {item.population}
              </Text>
              <Text style={styles.cardDescription}>
                Last Updated: {new Date(item.day).toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    paddingHorizontal: 15,
  },
  medicWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9d5ff",
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  medicHeading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#6d28d9",
    textTransform: "uppercase",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6d28d9",
    marginRight: 180,
  },
  counterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bca4ca",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
  },
  notificationIcon: {
    fontSize: 16,
    color: "#fff",
    marginRight: 5,
  },
  clickCounterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#4a5568",
    marginTop: 5,
  },
});
