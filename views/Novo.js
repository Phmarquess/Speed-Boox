import React, {useState,useEffect} from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Text, View} from 'react-native';
import {css} from '../assets/css/Css';
import config from "../config/config";

import{validEmail} from './regex';


export default function Novo({navigation}) {
    
    const [usuario,setUsuario] = useState(null); 
    const [senha,setSenha] = useState(null);
    const [confirmacaoSenha,setConfirmacaoSenha] = useState(null);
    const [email,setEmail] = useState(null);
    const [confirmacaoEmail,setConfirmacaoEmail] = useState(null);

     //Envio do formulário
     async function sendForm()
     {
         let response=await fetch(`${config.urlRoot}createUser`,{
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                 name: usuario,
                 password:senha,
                 email: email,
             })
         });
         
     }

    

     //comfirmar email e senha
    async function confirmar()
    {
        if( usuario === null ){
            alert('Nome invalido ');
        }else{
            if( email === null ){
                alert('Email invalido ');
                }else{
                if( email === null ){
                alert('Email invalido ');
                    }else{
                    if( senha === null ){
                        alert('Senha invalida ');
                            }else{
                            if(senha === confirmacaoSenha){
                                validateEmail();
                                }else{
                                alert('Senhas diferentes ');
                            }
                        }
                    }
                
            }
        }
    }
    
        async function validateEmail() {
            if (!validEmail.test(email)) {
                setEmail(true);
                alert('Email invalido');
                
              } else {
                setEmail(false);
                sendForm();
                navigation.navigate('Login');
                alert('Conta criada com sucesso!! ');
                
              }
           
          }
    
    


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.darkbg]}>
            <View style={css.login__logomarca}>
                <Image style={css.cadastro__logomarca} source={require('../assets/img/logo.png')} />
            </View>


                <TextInput style={css.cadastro__input} placeholder='Nome' onChangeText={text=>setUsuario(text)} />

                <TextInput style={css.cadastro__input} placeholder='E-Mail'onChangeText={text=> setEmail(text)} />
                <TextInput style={css.cadastro__input} placeholder='Comfirmação E-mail' onChangeText={text=>setConfirmacaoEmail(text)}/>

                <TextInput style={css.cadastro__input} placeholder='Senha' secureTextEntry={true} onChangeText={text=>setSenha(text)}/>
                <TextInput style={css.cadastro__input} placeholder='Confirmação Senha' secureTextEntry={true} onChangeText={text=>setConfirmacaoSenha(text)}/>
                
                
                
                <TouchableOpacity style={css.login_button} onPress={()=> confirmar()}>
                    <Text style={css.login_buttonText}>Cadastrar</Text>
                </TouchableOpacity>

            
          
        </KeyboardAvoidingView>
    );
}