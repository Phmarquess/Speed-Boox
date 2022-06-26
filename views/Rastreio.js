import React, {useState,useEffect} from 'react';
import {Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native';
import {css} from '../assets/css/Css';
import config from '../config/config';

export default function Rastreio({navigation}) {

    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);

    //Envia os dados do formulário
    async function sendForm()
    {
        let response=await fetch(config.urlRoot+'rastreio',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        });
        let json=await response.json();
        setResponse(json);
    }

    

    return (
        <View style={[css.container, css.darkbg]}>
            
            <Image source={require('../assets/img/rastreio-icon.png')} />

            <TextInput
                    placeholder='Digite o código de rastreio'
                    onChangeText={text=>setCode(text)}
                style={[css.login_input,css.margin2]}
            />

            <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
                <Text style={css.login_buttonText}>Rastrear</Text>
            </TouchableOpacity>

            <Text style={css.resposta}>{response}</Text>
        </View>
    );
}