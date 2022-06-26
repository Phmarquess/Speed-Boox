import React from 'react';
import {Text, View, Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { css } from '../../assets/css/Css';


export default function MenuAreaRestrita(props) 
{
    async function logout()
    {
        await AsyncStorage.clear();
        props.navigation.navigate('Home');
    }

    return (
        <View style={css.area_menu}>
            <TouchableOpacity style={css.button_home3} onPress={() =>props.navigation.navigate('Home')}>
                <Icon name="home" size={20} color="#000"/>
            </TouchableOpacity>

            <Text style={css.area_title}>{props.title}</Text>

            <TouchableOpacity style={css.button_logout} onPress={() =>logout()}>
                <Icon name="sign-out" size={20} color="#000"/>
            </TouchableOpacity>
            
            </View>
    );
}