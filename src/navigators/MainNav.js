import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{ title: HomeScreen }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
