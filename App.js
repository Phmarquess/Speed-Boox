import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {Text, View,} from 'react-native'; 
import{css} from './assets/css/Css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Home,Login,Rastreio,Contato,Filiais,Valor,Novo} from './views';
import AreaRestrita from './views/arearestrita/AreaRestrita'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <><View><StatusBar hidden /></View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "                               Speed Box",
            headerStyle: { backgroundColor: "#6646B1" },
            headerTintColor: '#000',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }} />
        <Stack.Screen name="Login" options={{headerShown:false}}component={Login} />
        <Stack.Screen name="Rastreio"options={{headerShown:false}} component={Rastreio} />        
        <Stack.Screen name="Contato"options={{headerShown:false}} component={Contato} />
        <Stack.Screen name="Filiais"options={{headerShown:false}} component={Filiais} />
        <Stack.Screen name="Valor" options={{headerShown:false}} component={Valor} />
        <Stack.Screen name="Novo" options={{ headerShown: false}} component={Novo} />
        <Stack.Screen name="AreaRestrita"options={{headerShown:false}} component={AreaRestrita} />
      </Stack.Navigator>
    </NavigationContainer></>
);
}

