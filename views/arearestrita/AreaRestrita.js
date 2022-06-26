import React, {useState,useEffect}  from 'react';
import {Text, View,Alert, BackHandler, Button} from 'react-native';
import {css} from '../../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Profile,Cadastro,Edicao, Filial} from '../index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AreaRestrita({navigation}) {

    const Tab = createMaterialBottomTabNavigator();
    const [user,setUser]=useState(null);

    useEffect(()=>{
        async function getUser()
        {
            let response=await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setUser(json.name);
        }
        getUser();
    },[]);
    
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
                {
                    text: "Não",onPress: () => {
                        navigation.navigate('Home');
                        }
                },
                { text: "Sim", onPress: () => {
                    navigation.navigate('Home');
                    BackHandler.exitApp();
                    }
                }
            ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    }, []);




    return (
        <Tab.Navigator
        activeColor='#fff'
        inactiveColor='#000'
        barStyle={css.area_tab}
        >
            
            <Tab.Screen
             name="Cadastro"
              component={Cadastro}
              options={{
                tabBarIcon:()=>(
                    <Icon name="archive" size={20} color="#000" />
                )
            }}
              />
            <Tab.Screen 
            name="Ediçao"
            component={Edicao}
            options={{
                tabBarIcon:()=>(
                    <Icon name="edit" size={20} color="#000" />
                )
            }}
            />
            <Tab.Screen 
            name="Perfil" 
            component={Profile}
            options={{
                tabBarIcon:()=>(
                    <Icon name="user" size={20} color="#000" />
                )
            }}
            />
            <Tab.Screen 
            name="Filial" 
            component={Filial}
            options={{
                tabBarIcon:()=>(
                    <Icon name="home" size={20} color="#000" />
                )
            }}
            />
            
        </Tab.Navigator>
    );
}