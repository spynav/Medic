import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
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

type CountryFlagData = {
  [country: string]: string; // Maps country name to flag URL
};

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext); // Use context for managing click count
  const [statistics, setStatistics] = useState<CovidStatistics[]>([]);
  const [flags, setFlags] = useState<CountryFlagData>({});

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
        const firstFiftyCountries = data.response.slice(0, 50); // Get the first 50 countries
        setStatistics(firstFiftyCountries);

        // Fetch flags for the listed countries
        fetchCountryFlags(firstFiftyCountries.map((item: CovidStatistics) => item.country));
      } catch (error) {
        console.error("Error fetching COVID-19 statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

// Fetch country flags
const fetchCountryFlags = async (countryNames) => {
  const flagData = {};

  await Promise.all(
    countryNames.map(async (countryName) => {
      try {
        // Use country name directly without normalization
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const data = await response.json();

        if (data && Array.isArray(data) && data.length > 0) {
          flagData[countryName] =
            data[0].flags?.svg || data[0].flags?.png || ""; // Save flag URL
        } else {
          console.warn(`No data found for country: ${countryName}`);
        }
      } catch (error) {
        console.error(`Error fetching flag for ${countryName}:`, error);
      }
    })
  );

  setFlags(flagData);
};


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

      </View>

      {/* Statistics List */}
      <FlatList
        data={statistics}
        keyExtractor={(item) => item.country}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <View style={styles.cardContent}>
              {flags[item.country] && (
                <Image
                  source={{ uri: flags[item.country] }}
                  style={styles.flagImage}
                />
              )}
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
        {/* Floating Click Counter */}
            <View style={styles.floatingCounter}>
              <Text style={styles.counterText}>💜 {clickCount}</Text>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    paddingHorizontal: 15,
     position: "relative",
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
  flagImage: {
    width: 60,
    height: 40,
    resizeMode: "contain",
    borderRadius: 5,
    marginBottom: 10,
  },
   floatingCounter: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: "#6d28d9",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    counterText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#fff",
    },
});
