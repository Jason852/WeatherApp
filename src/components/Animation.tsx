import { StyleSheet, Text, View, Image } from 'react-native'
import { useState } from 'react';
import React from 'react'

import LottieView from "lottie-react-native";


export default function Animation({icon}) {
    const [iconPicker, setIconPicker ] = useState(icon);

    // if (icon = "01d") {
    //     setIconPicker("rain");
    //     return;
    // } else {
    //     return
    // };

     console.log(icon);
  return (
    <View>
      {/* <Image source={require(`../../assets/${iconPicker}.png`)}/>   */}
      <LottieView source={require("../../assets/lottie/01d.json")} style={{ width: 200, aspectRatio: 1 }} loop autoPlay />
    </View>
  )
}

const styles = StyleSheet.create({})