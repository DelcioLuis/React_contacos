import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Screens/Home';
import AsionaCont from '../Screens/AddCont';

import Edit from '../Screens/Editcont';


const Stack = createStackNavigator();


const RootStackScreen = ({navigation}) => (

    
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Newcontac" component={AsionaCont}/>
        <Stack.Screen name="Editconta" component={Edit}/>


    </Stack.Navigator>
    
);

export default RootStackScreen;

