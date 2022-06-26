import React ,{useState,useEffect} from 'react';
import { KeyboardAvoidingView,Text,Image, View,TextInput,TouchableOpacity, Platform, } from 'react-native';
import { css } from '../assets/css/Css';
import config from "../config/config";


export default function Contato({navigation})
{
    const [email,setEmail]=useState(null);
    const [asunto,setAsunto]=useState(null);
    const [mensagen,setMensagem]=useState(null);

    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}send-email`,{
            method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: email,
            subject: asunto,
            text:mensagen,
        })
    });
}

    return(
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.darkbg]}>
            <View style={css.login__logomarca}>
                <Image style={css.cadastro__logomarca} source={require('../assets/img/logo.png')} />
            </View>


                <TextInput style={css.cadastro__input} placeholder='E-mail' onChangeText={text=>setEmail(text)} />

                <TextInput style={css.cadastro__input} placeholder='Asunto'onChangeText={text=> setAsunto(text)} />

                <TextInput style={css.cadastro__input} placeholder='Mensagen'onChangeText={text=> setMensagem(text)} />
                
                
                
                <TouchableOpacity style={css.login_button} onPress={()=> sendForm()}>
                    <Text style={css.login_buttonText}>Enviar</Text>
                </TouchableOpacity>
           
          
        </KeyboardAvoidingView>
    );
}