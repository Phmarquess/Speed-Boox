import React ,{useState,useEffect} from 'react';
import { KeyboardAvoidingView,Text,Image, View,TextInput,TouchableOpacity, Platform, } from 'react-native';
import { css } from '../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import config from "../config/config";


export default function Login({navigation})
{
    const [display,setDisplay]=useState("none");
    const [user,setUser]=useState(null);
    const [password,setPassword]=useState(null);
    const[login,setLogin]=useState(null);

    useEffect(()=>{
        verifyLogin();
    },[]);

    useEffect(()=>{
        if(login === true){
            biometric();
        }
    },[login]);

    //Funçao para verificar se ja existe login
    async function verifyLogin()
{
    let response=await AsyncStorage.getItem('userData');
    let json=await JSON.parse(response);
    if(json !== null){
        setUser(json.email);
        setPassword(json.password);
        setLogin(true);
    }

}
    //Biometria
    async function biometric()
{
    let compatible= await LocalAuthentication.hasHardwareAsync();
    if(compatible){
        let biometricRecords = await LocalAuthentication.isEnrolledAsync();
        if(!biometricRecords){
            alert('Biometria não cadastrada');
        }else{
            let result=await  LocalAuthentication.authenticateAsync();
            if(result.success){
                sendForm();
            }else{
                setUser(null);
                setPassword(null);
            }
        }
    }
}

    async function sendForm()
    {
        let response = await fetch(`${config.urlRoot}login`,{
            method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user,
            password: password
        })
    });
    let json=await response.json();
    if(json === 'error'){
        setDisplay('flex');
        setTimeout(()=>{
            setDisplay('none');
        },5000);
        await AsyncStorage.clear();
    }else{
        await AsyncStorage.setItem('userData', JSON.stringify(json));
        navigation.navigate('AreaRestrita');
    }
}

    return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={[css.container, css.darkbg]}>
       <View >
            <Image source={require('../assets/img/logo.png')}/>
        </View>

        <View ><Text style={css.login_msg(display)} >Email ou senha invalidos!</Text></View>

        <View style={css.login_form}>
                <TextInput style={css.login_input} placeholder='Email' onChangeText={text=>setUser(text)} />
                <TextInput style={css.login_input} placeholder='Senha' onChangeText={text=>setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
                    <Text style={css.login_buttonText}>Entrar</Text>
                </TouchableOpacity>
                <View >
                <TouchableOpacity style={css.button__novo}  onPress={() => navigation.navigate('Novo')}>
                  <Image  style={css.img__novouser}source={require('../assets/img/NovoUser.png')} />
                </TouchableOpacity>

            </View>
        </View>
    </KeyboardAvoidingView>
    );
}