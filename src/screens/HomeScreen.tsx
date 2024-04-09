import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from "react-native";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";

import * as Location from "expo-location";
import ForecastItem from "../components/ForecastItem";
import Animation from "../components/Animation";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = "5edd63147368df5ac8a2b0e22f443d0c";

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

type Weather = {
  name: string;
  main: MainWeather;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
}  

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
        return(
          <View style={{flex: 1, justifyContent: "center"}}>
            <Text>{errorMsg}</Text>
          </View>
        );
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
    console.log(JSON.stringify(data, null, 2));
    //console.log(weather?.weather[0].icon);
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }

    const numberOfForecasts = 30;
    const results = await fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&cnt=${numberOfForecasts}&appid=${OPEN_WEATHER_KEY}&units=imperial`
    );
    const data = await results.json();
     //console.log(JSON.stringify(data, null, 2));
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }


  return (
    <ImageBackground source={require("../images/bgImage.jpg")} style={styles.container}>
      <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.4)'}}/>
    
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Animation icon={weather?.weather[0].icon} />
        {/* <LottieView source={require('../../assets/lottie/rain.json')} style={{ width: 200, aspectRatio: 1 }} loop autoPlay /> */}
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.floor(weather.main.temp)}˚F</Text>
        
      </View>
      
        <FlatList
          data={forecast}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ 
            flexGrow: 0, 
            height: 200, 
            marginBottom: 40 
          }}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 10,
          }}
          renderItem={({ item }) => <ForecastItem forecast={item} />}          
        />
     
    </ImageBackground>
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
    color: "lightgrey",
  },
  temp: {
    // fontFamily: "Inter",
    fontSize: 120,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
});