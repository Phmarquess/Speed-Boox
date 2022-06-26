import React ,{useState,useEffect} from 'react';
import { KeyboardAvoidingView,Text,Image, View,TextInput,TouchableOpacity, Platform, } from 'react-native';
import { css } from '../assets/css/Css';
import config from "../config/config";


export default function Filiais({navigation})
{
    const [cidade,setCidade]=useState(null);
    const [endereco,setEndereco]=useState(null);

    async function sendForm()
{
    let response=await fetch(config.urlRoot+'filialCidade',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cidade: cidade
        })
    });
    let json=await response.json();
    setEndereco(json.endereco);    
   
}


    return(
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.darkbg]}>
          
            <View style={css.login__logomarca}>
                <Image style={css.cadastro__logomarca} source={require('../assets/img/filiais.png')} />
            </View>


                <TextInput style={css.cadastro__input} placeholder='Cidade' onChangeText={text=>setCidade(text)} />
                
               
                <TextInput style={css.cadastro__input}
                    placeholder='Localizaçao'
                    onChangeText={text=>setEndereco(text)}
                    value={endereco}                
                />
                
                
                
                <TouchableOpacity style={css.login_button} onPress={()=> sendForm()}>
                    <Text style={css.login_buttonText}>Procura</Text>
                </TouchableOpacity>
           
          
        </KeyboardAvoidingView>
    );
}