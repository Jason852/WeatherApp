import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WeatherForecast } from '../screens/HomeScreen';

const ForecastItem = ({forecast} : {forecast:WeatherForecast}) => {
  return (
    <View style={styles.container}>
        <Text > {Math.floor(forecast.main.temp)}˚F</Text>
    </View>
  )
  };

export default ForecastItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        padding: 10,
        aspectRatio: 1,
    }   
})