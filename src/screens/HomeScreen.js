import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

import Colors from "../constants/colors";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(null);

  useEffect(() => {
    fetch("https://api.weather.gov/gridpoints/LWX/97,71/forecast")
      .then((res) => {
        if (res.ok) {
          return res;
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // applied this if statement in order not to get undefined
  if (data) {
    const periods = data.properties.periods;
    const currentData = periods[0];
    console.log(currentData.isDaytime);

    // if (currentData.isDaytime === "true") {
    //   setBackgroundColor(Colors.backgroundBlue);
    // } else {
    //   setBackgroundColor(Colors.darkBlue);
    // }
  }

  return (
    <>
      {data ? (
        <View style={styles.container}>
          <Text>
            This is about to be the most AWESOMEST Weather App in the world! At
            least almost the most awesomest. Check Check
          </Text>
          <Text style={{ color: "red" }}>{data.properties.updated}</Text>
          <StatusBar style="auto" />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundBlue,
    // *!*!*!*!* currentData.isDaytime === "true" ? Colors.backgroundBlue : Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
