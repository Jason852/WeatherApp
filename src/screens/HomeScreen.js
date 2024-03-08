import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=26.1276&lon=-80.2331&appid=5edd63147368df5ac8a2b0e22f443d0c&units=imperial`;

type Weather = {
  name: string,
};

export default function HomeScreen() {
  const [weather, setWeather] = useState();

  const fetchWeather = async () => {
    console.log("fetch data ");

    const results = await fetch(url);
    const data = await results.json();
    console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <View styles={styles.container}>
      <Text styles={styles.location}>{weather.name}</Text>
      <Text styles={styles.temp}>{weather.main.temp}F</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  location: {},
  temp: {},
});
