import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home Screen"
            component={HomeScreen}
           options={{ title: "HomeScreen", headerShown: false }}
          />
       </Stack.Navigator>
      </NavigationContainer>
    );
  }

