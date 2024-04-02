import { StyleSheet, Text, View, Image } from 'react-native'
import { useState } from 'react';
import React from 'react'

import { animationSelection } from '../../assets/animationsEx';

import LottieView from "lottie-react-native";

type animationSelection ={
    id: string,
    animation: string,
};


export default function Animation({icon}) {
    const [iconPicker, setIconPicker ] = useState(icon);
      
    console.log(iconPicker);

    // let selectedImage = animationSelection.filter((item) => item.id == icon).map(({id, animation}) => ({animation}));

    var selectedImage = animationSelection.filter(item => {
        return item.id === icon
      });


        
    console.log(selectedImage);


    // const imageSelected = `../../assets/lottie/${iconPicker}.json`;

  return (
    <View>
      <LottieView source={selectedImage} style={{ width: 200, aspectRatio: 1 }} loop autoPlay />
    </View>
  )
}

const styles = StyleSheet.create({})