import React, {useState,useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {css} from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import config from "../../config/config";

import{validEmail} from '../regex';

export default function Profile({navigation}) {

    const [idUser, setIdUser] = useState(null);
    const [senhaAntiga, setSenhaAntiga] = useState(null);
    const [novaSenha, setNovaSenha] = useState();
    const [confNovaSenha, setConfNovaSenha] = useState(null);
    const [msg, setMsg] = useState(null);


    const [email, setEmail] = useState(null);
    const [novoEmail, setNovoEmail] = useState();
    const [confNovoEmail, setConfNovoEmail] = useState(null);


    useEffect(()=>{
       async function getIdUser()
       {
           let response=await AsyncStorage.getItem('userData');
           let json=JSON.parse(response);
           setIdUser(json.id);
       }
       getIdUser();
    });

    async function confirmarSenha()
    {
        if( novaSenha == null ){
            setMsg('Nova senha invalida!');
        }else{
            sendFormSenha()
        }
    }

    async function sendFormSenha()
    {
        let response=await fetch(`${config.urlRoot}verifyPass`,{
            method:'POST',
            body:JSON.stringify({
                id:idUser,
                senhaAntiga:senhaAntiga,
                novaSenha:novaSenha,
                confNovaSenha:confNovaSenha
            }),
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json=await response.json();
        setMsg(json);
    }


    



    async function confirmarEmail()
    {
        if( novoEmail == null ){
            setMsg('Novo E-mail invalido!');
        }else{
            sendFormEmail()
            
        }
    }

    async function validateEmail()
    {
        if (!validEmail.test(novoEmail)) {
            setNovoEmail(true);
            setMsg('E-mail invalido!');
            
          } else {
            setNovoEmail(false);
            confirmarEmail()
            
            
          }
    }
       


    async function sendFormEmail()
    {
        let response=await fetch(`${config.urlRoot}verifyEmail`,{
            method:'POST',
            body:JSON.stringify({
                id:idUser,
                email:email,
                novoEmail:novoEmail,
                confNovoEmail:confNovoEmail
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
            <MenuAreaRestrita title='Perfil' navigation={navigation} />
                <Text style={css.msg}>{msg}</Text>
            <View style={css.login_form}>
                
                <TextInput style={[css.login_input,css.margin2]} placeholder='Senha Atual:' onChangeText={text=>setSenhaAntiga(text)} />
                <TextInput style={[css.login_input]} placeholder='Nova Senha:' onChangeText={text=>setNovaSenha(text)} />
                <TextInput style={[css.login_input]} placeholder='Confirmação da Nova Senha:' onChangeText={text=>setConfNovaSenha(text)} />
                <TouchableOpacity onPress={()=>confirmarSenha()}>
                    <Text style={css.login_button}>Trocar Senha</Text>
                </TouchableOpacity>
            </View>

            <View style={css.login_form}>

                <TextInput style={[css.login_input, css.margin]} placeholder='Email Atual:' onChangeText={text=>setEmail(text)} />
                <TextInput style={[css.login_input]} placeholder='Novo Email:' onChangeText={text=>setNovoEmail(text)} />
                <TextInput style={[css.login_input]} placeholder='Confirmação do Novo Email:' onChangeText={text=>setConfNovoEmail(text)} />
                <TouchableOpacity onPress={()=>validateEmail()}>
                    <Text style={css.login_button}>Trocar Email</Text>
                </TouchableOpacity>
                
                
            </View>
        </View>
    );
}