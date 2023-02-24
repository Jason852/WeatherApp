import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState();
  const [periods, setPeriods] = useState();

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

  console.log({ data });

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
