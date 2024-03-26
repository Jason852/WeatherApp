import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WeatherForecast } from '../screens/HomeScreen';

const ForecastItem = ({forecast} : {forecast:WeatherForecast}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.temp}> {Math.round(forecast.main.temp)}</Text>
    </View>
  )
  };

export default ForecastItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "ghostwhite",
        padding: 10,
        aspectRatio: 9 / 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    temp: {
      fontFamily: "Inter",
      fontSize: 20,
      color: "gray",
    } 
})