import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";

import Stack from "./src/Routes/StackNavigator";

export default function App() {

  return (
    <>
      <StatusBar backgroundColor='red' />
      <NavigationContainer>
        <Stack />

      </NavigationContainer>
    </>

    
  );
}

