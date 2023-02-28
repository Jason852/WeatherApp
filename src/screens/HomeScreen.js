import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const [data, setData] = useState();

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
    console.log(currentData);
  }

  return (
    <>
      {data ? (
        <LinearGradient colors={["#3389F1", "#fff"]} styles={{ flex: 1 }}>
          <View style={styles.container}>
            <Text>
              This is about to be the most AWESOMEST Weather App in the world!
              At least almost the most awesomest. Check Check
            </Text>
            <Text style={{ color: "red" }}>{data.properties.updated}</Text>
            <StatusBar style="auto" />
          </View>
        </LinearGradient>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
