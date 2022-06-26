import React from 'react';
import {Text, View, Button, TouchableOpacity,Image} from 'react-native';
import { css } from '../assets/css/Css';

export default function Home({navigation}) {

    return (

       <><View style={css.container2}>
            <TouchableOpacity style={css.button__home} onPress={() => navigation.navigate('Login')}>
                <Image source={require('../assets/img/ButtonLogin.png')} />
                <Text style={css.textHome}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={css.button__home} onPress={() => navigation.navigate('Rastreio')}>
                <Image source={require('../assets/img/ButtonRastreio.png')} />
                <Text style={css.textHome}>Rastreio</Text>
            </TouchableOpacity>

        </View>
        
        <View style={css.container2}>
            <TouchableOpacity style={css.button__home} onPress={() => navigation.navigate('Valor')}>
                <Image source={require('../assets/img/ButtonValor.png')} />
                <Text style={css.textHome}>Calculo de Transporte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={css.button__home} onPress={() => navigation.navigate('Filiais')}>
                <Image source={require('../assets/img/ButtonFiliais.png')} />
                <Text style={css.textHome}>Filiais</Text>
            </TouchableOpacity>

         </View>
            
        <View style={css.container2}>
            <TouchableOpacity style={css.button__home} onPress={() => navigation.navigate('Contato')}>
                <Image source={require('../assets/img/ButtonContato.png')} />
                <Text style={css.textHome}>Contato</Text>
            </TouchableOpacity>                
         </View>

              
            </>
    );
}