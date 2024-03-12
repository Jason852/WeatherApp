import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import * as Location from "expo-location";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = "5edd63147368df5ac8a2b0e22f443d0c";

// type Weather = {
//   name: string,
//   main: {
//     temp: number,
//     feels_like: number,
//     temp_min: number,
//     temp_max: number,
//     pressure: number,
//     humidity: number,
//     sea_level: number,
//     grnd_level: number,
//   },
// };

export default function HomeScreen() {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location) {
      return;
    }

    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    const results = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=imperial`
    );
    const data = await results.json();
    //console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  const fetchForecast = async () => {
    // https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

    if (!location) {
      return;
    }
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    const numberOfDays = 5;
    const results = await fetch(
      `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&cnt=${numberOfDays}&appid=${OPEN_WEATHER_KEY}&units=imperial`
    );
    const data = await results.json();
    console.log(JSON.stringify(data, null, 2));
    setForecast(data);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.floor(weather.main.temp)}˚F</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    // fontFamily: "Inter",
    fontSize: 30,
  },
  temp: {
    // fontFamily: "Inter",
    fontSize: 120,
    fontWeight: "bold",
    color: "grey",
  },
});
