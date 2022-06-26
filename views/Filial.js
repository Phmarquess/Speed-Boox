import React, {useState,useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {css} from '../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from "../assets/components/MenuAreaRestrita";
import config from "../config/config";

export default function Filial({navigation}) {  

    const [cidade, setCidade] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [msg, setMsg] = useState(null);




    async function sendFormSenha()
    {
        let response=await fetch(`${config.urlRoot}novaFilial`,{
            method:'POST',
            body:JSON.stringify({
                cidade:cidade,
                endereco:endereco,
            }),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json=await response.json();
        setMsg(json);
    }
  

    return (
        
        <View style={[css.container, css.containerTop, css.bgd]}>
            <MenuAreaRestrita title='Filiais' navigation={navigation} />
            <View style={css.login_form}>
                
                <TextInput style={[css.login_input,css.margin2]} placeholder='Cidade' onChangeText={text=>setCidade(text)} />
                <TextInput style={[css.login_input]} placeholder='Endereço' onChangeText={text=>setEndereco(text)} />
                
                <TouchableOpacity onPress={()=>sendFormSenha()}>
                    <Text style={css.login_button}>Cadastra</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}