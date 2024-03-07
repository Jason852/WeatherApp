import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=26.1276&lon=-80.2331&appid=5edd63147368df5ac8a2b0e22f443d0c&units=imperial`;

export default function HomeScreen() {
  const fetchWeather = async () => {
    console.log("fetch data ");

    const results = await fetch(url);
    const data = await results.json();
    console.log(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View>
      <Text>Heres where its all about to go down. on the spot</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
