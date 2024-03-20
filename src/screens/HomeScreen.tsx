import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

import * as Location from "expo-location";
import ForecastItem from "../components/ForecastItem";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = "5edd63147368df5ac8a2b0e22f443d0c";

type MainWeather = {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number,
  sea_level: number,
  grnd_level: number,
}

type Weather = {
  name: string,
  main: MainWeather,
};

export type WeatherForecast = {
  main: MainWeather,
  dt: number,

}

export default function HomeScreen() {
  const [location, setLocation] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();

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

    const results = await fetch(
      `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=imperial`
    );
    const data = await results.json();
    //console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }

    const numberOfDays = 40;
    const results = await fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&cnt=${numberOfDays}&appid=${OPEN_WEATHER_KEY}&units=imperial`
    );
    const data = await results.json();
     console.log(JSON.stringify(data, null, 2));
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.floor(weather.main.temp)}˚F</Text>
      <View style={styles.forecastContainer}>
        <FlatList
          data={forecast}
          horizontal
          contentContainerStyle={{gap: 10, backgroundColor: "blue", height: 100}}
          renderItem={({ item }) => <ForecastItem forecast={item} />}          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent: "center",
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
  forecastContainer: {
    //height: 40,
    marginHorizontal: 10,
  },
});
