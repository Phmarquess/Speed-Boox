import React, {useState,useEffect}  from 'react';
import {Text, View,Image, Button,TouchableOpacity, TextInput,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { css } from '../../assets/css/Css';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';
import config from '../../config/config';

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function Cadastro({navigation}) {

    const address=config.origin;
    const [code,setCode]=useState(null);
    const [user,setUser]=useState(null);
    const [product,setProduct]=useState(null);
    const [response,setResponse]=useState(null);

    
    const [destinatario,setDestinatario]=useState(null);
    const [nomeRemetente,setNomeRemetente]=useState(null);
    const [nomeDestinatario,setNomeDestinatario]=useState(null);

    useEffect(()=>{
        getUser();
    },[]);

    

    useEffect(()=>{
        randomCode();
        setProduct('');
        
        setDestinatario('');
        setNomeRemetente('');
        setNomeDestinatario('');

    },[response]);

    //Pegar o id do usuário
    async function getUser()
    {
        let response=await AsyncStorage.getItem('userData');
        let json=JSON.parse(response);
        setUser(json.id);
    }

    //Gerar um código randômico
    async function randomCode()
    {
        let result = 'br';
        let length=8;
        let chars='0123456789';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setCode(result);
    }

    //Envio do formulário
    async function sendForm()
    {
        let response=await fetch(config.urlRoot+'create',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user,
                code: code,
                product: product,
                local: address
            })
        });

        let json=await response.json();
        setResponse(json);
    }

    //Compartilhar o QRCode
    async function shareQR()
    {
    const image=config.urlRoot+'img/code.png';
    FileSystem.downloadAsync(
        image,
        FileSystem.documentDirectory+'.png'
    ).then(({uri})=>{
        Sharing.shareAsync(uri);
    });
    await Sharing.shareAsync();
    }

    return (
        <View style={[css.container,css.containerTop,css.bgd]}>
            <MenuAreaRestrita title='Cadastro' navigation={navigation} />

            {response && (
                <View>
                    <Image source={{uri:response, height:300, width:250}} />
                    <Button title='Compartilhar' onPress={()=>shareQR()} />
                </View>
            )}

            <View style={css.login_form}>
                <TextInput style={[css.margin,css.login_input]}
                        placeholder='Endereço do Remetente'
                        onChangeText={text=>setProduct(text)}
                        value={product}
                    
                />
            </View>
            <View style={css.login_form}>
                <TextInput style={[css.margin,css.login_input]}
                        placeholder='Endereço do Destinatario'
                        onChangeText={text=>setDestinatario(text)}
                        value={destinatario}
                    
                />
            </View>
            <View style={css.login_form}>
                <TextInput style={[css.margin,css.login_input]}
                        placeholder='Nome do destinatario'
                        onChangeText={text=>setNomeDestinatario(text)}
                        value={nomeDestinatario}
                    
                />
            </View>
            <View style={css.login_form}>
                <TextInput style={[css.margin,css.login_input]}
                        placeholder='Nome do Remetente'
                        onChangeText={text=>setNomeRemetente(text)}
                        value={nomeRemetente}
                    
                />
            </View>

            <TouchableOpacity style={[css.margin,css.login_button]}onPress={()=>sendForm()}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}