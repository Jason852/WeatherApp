import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WeatherForecast } from '../screens/HomeScreen';
import dayjs from 'dayjs';

const ForecastItem = ({forecast} : {forecast:WeatherForecast}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.temp}> {Math.round(forecast.main.temp)}˚</Text>
        <Text style={styles.date}>{dayjs(forecast.dt * 1000).format('ddd ha')}</Text>
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
      //fontFamily: "Inter",
      fontWeight: "bold",
      fontSize: 35,
      color: "gray",
      marginVertical: 10,
    },
    date: {
      fontWeight: "bold",
      fontSize: 16,

    } 
})