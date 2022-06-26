import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState,useEffect} from 'react';
import {Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import MenuAreaRestrita from "../../assets/components/MenuAreaRestrita";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {css} from '../../assets/css/Css';
import config from '../../config/config';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
//import ServerContext from '@react-navigation/native/lib/typescript/src/ServerContext';

export default function Edicao({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    useEffect(()=>{
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
        })();
    });

    //Leitura do código QR
    async function handleBarCodeScanned({ type, data }){
        setScanned(true);
        setDisplayQR('none');
        setDisplayForm('flex');
        setCode(data);
        await searchProduct(data);
        await getLocation();
    }

    async function searchProduct(codigo)
    {
        let response=await fetch(config.urlRoot+'searchProduct',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codigo
            })
        });
        let json=await response.json();
        
    }

    
    //Envia o formulário com os dados para edição
    async function sendForm() {
        let response=await fetch(config.urlRoot+'update',{
        method: 'POST',
        headers:{
                Accept: 'application/json',
            'Content-type':'application/json'
        },
            body: JSON.stringify({
                code: code,
                local: localization
            })
        });
        let json=await response.json();
        setResponse(json);
    }
    




    //Nova leitura do QRCode
    async function readAgain()
    {
        setScanned(false);
        setDisplayQR('flex');
        setDisplayForm('none');
        setCode(null);
        setLocalization(null);
    }


    //Retorna a posição e endereço do usuário
async function getLocation()
{
    let location = await Location.getCurrentPositionAsync({});
    Geocoder.init(config.geocodingAPI);
    Geocoder.from(location.coords.latitude, location.coords.longitude)
        .then(json => {
            let number = json.results[0].address_components[0].short_name;
            let street = json.results[0].address_components[1].short_name;
            let cidade = json.results[11].address_components[0].short_name;
            let estado = json.results[10].address_components[0].short_name;
            setLocalization(` ${street}- ${number}-${estado} -${cidade}`);
        })
        .catch(error => console.warn(error));
}



    return (
        <View style={[css.container,css.containerTop, css.darkbg]}>
            <MenuAreaRestrita title='Edição' navigation={navigation} />

            <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : value=>handleBarCodeScanned(value)}
                style={css.qr__code(displayQR)}
            />

            <View style={css.qr__form(displayForm)}>
                <Text style={css.edcao2} >{response}</Text>
                
                <Text style={[css.edcao,css.margin2]}>Código do Produto: {code}</Text>

                <View >
                    <TextInput style={css.edcao}
                            placeholder='Localização do Produto:'
                            onChangeText={text=>setLocalization(text)}
                        value={localization}
                    />
                </View>

                <TouchableOpacity style={[css.login_button,css.margin]}  onPress={()=>sendForm()}>
                    <Text>Atualizar</Text>
                </TouchableOpacity>
                
                {scanned &&
                    <View style={css.margin}>
                        <Button
                                title='Escanear Novamente'
                                onPress={()=>readAgain()}
                        />
                    </View>
}
            </View>
        </View>
    );
}