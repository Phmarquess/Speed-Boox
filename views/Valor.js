import React from 'react';
import {css} from '../assets/css/Css';

import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Button } from 'react-native';
import Axios from 'axios';
import { buscarFrete } from '../src/apis/correios';
import { convertXML } from "simple-xml-to-json";


const main = async ({
  nCdEmpresa,
  nDsSenha,
  nCdServico,
  sCepOrigem,
  sCepDestino,
  nVlPeso,
  nCdFormato,
  nVlComprimento,
  nVlAltura,
  nVlLargura,
  nVlDiametro
}) => {
  // const data = {
  //   "nCdEmpresa" : "",
  //   "sDsSenha" : "",
  //   "nCdServico": "04014",
  //   "sCepOrigem": "70002900",
  //   "sCepDestino": "04547000",
  //   "nVlPeso": 1,
  //   "nCdFormato": 1,
  //   "nVlComprimento": 20,
  //   "nVlAltura": 20,
  //   "nVlLargura": 20,
  //   "nVlDiametro": 1
  // }
  const retorno = await buscarFrete({
    nCdEmpresa,
    nDsSenha,
    nCdServico,
    sCepOrigem,
    sCepDestino,
    nVlPeso,
    nCdFormato,
    nVlComprimento,
    nVlAltura,
    nVlLargura,
    nVlDiametro
  })
}
// main();

export default function Valor({navigation}) {
  const [numServico, setNumServico] = useState('')
  const [cepOrigem, setCepOrigem] = useState('')
  const [cepDestino, setCepDestino] = useState('')
  const [pesoObjeto, setpesoObjeto] = useState('')
  const [formatoObjeto, setFormatoObjeto] = useState('')
  const [comprimentoObjeto, setComprimentoObjeto] = useState('')
  const [alturaObjeto, setAlturaObjeto] = useState('')
  const [larguraObjeto, setLarguraObjeto] = useState('')
  const [diametroObjeto, setDiametroObjeto] = useState('')
  const [result, setResult] = useState({})
  async function HandleSubmit() {
    const response = await buscarFrete({
      nCdEmpresa: "",
      nDsSenha: "",
      nCdServico: numServico,
      sCepOrigem: cepOrigem,
      sCepDestino: cepDestino,
      nVlPeso: pesoObjeto,
      nCdFormato: formatoObjeto,
      nVlComprimento: comprimentoObjeto,
      nVlAltura: alturaObjeto,
      nVlLargura: larguraObjeto,
      nVlDiametro: diametroObjeto
    })
    const myjson = convertXML(response)
    setResult(myjson)
    return myjson
  }

  return (
    <ScrollView >
      <StatusBar style="auto" />
      <View style={[css.container, css.darkbg]}>
        <KeyboardAvoidingView behavior="position" enable>
          <Text style={styles.logo}>Calculo</Text>
          <View style={styles.viu}>            
            <TextInput style={[css.login_input]}
              onChangeText={(text) => setNumServico(text)}
             
              placeholder="Número do Serviço"
              value={numServico}
            // onChangeText={setCepOrigem}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            
            <TextInput
              onChangeText={(text) => setCepOrigem(text)}
              style={[css.login_input]}
              placeholder="Cep de Origem"
              value={cepOrigem}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            
            <TextInput
              onChangeText={(text) => setCepDestino(text)}
              style={[css.login_input]}
              placeholder="Cep de Destino"
              value={cepDestino}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            
            <TextInput
              onChangeText={(text) => setpesoObjeto(text)}
              style={[css.login_input]}
              placeholder="Peso do objeto"
              value={pesoObjeto}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            
            <TextInput
              onChangeText={(text) => setFormatoObjeto(text)}
              style={[css.login_input]}
              placeholder="Formato do objeto"
              value={formatoObjeto}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            <TextInput
              onChangeText={(text) => setComprimentoObjeto(text)}
              style={[css.login_input]}
              placeholder="Comprimento do objeto"
              value={comprimentoObjeto}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            <TextInput
              onChangeText={(text) => setAlturaObjeto(text)}
              style={[css.login_input]}
              placeholder="Altura do objeto"
              value={alturaObjeto}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            <TextInput
              onChangeText={(text) => setLarguraObjeto(text)}
              style={[css.login_input]}
              placeholder="Largura do objeto"
              value={larguraObjeto}
            ></TextInput>
          </View>
          <View style={styles.viu}>
            <TextInput
              onChangeText={(text) => setDiametroObjeto(text)}
              style={[css.login_input]}
              placeholder="Diâmetro do objeto"
              value={diametroObjeto}
            ></TextInput>
          </View>

          <TouchableOpacity
            onPress={() => HandleSubmit()}
            activeOpacity={0.7}>
            <Text style={css.login_button}>Calcular</Text>
          </TouchableOpacity>

          {result && result?.Servicos?.children.map(servico => {
            console.log(servico)
            return (
              <Fragment key={servico.cServico.children[1].Valor.content}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 30,
                    backgroundColor: "#694db4",
                    marginVertical: 10,
                    borderRadius: 6,

                  }}>
                  <Text style={css.login_button}
                    onPress={() => setResult({})}> Retornar</Text>
                </TouchableOpacity>
                <Text style={css.resposta}>Valor: {servico.cServico.children[1].Valor.content}</Text>
                <Text style={css.resposta}>Prazo de Entrega: {servico.cServico.children[2].PrazoEntrega.content}</Text>
                <Text style={css.resposta}>Entrega Domiciliar: {servico.cServico.children[7].EntregaDomiciliar.content}</Text>
                <Text style={css.resposta}>Entrega no Sábado: {servico.cServico.children[8].EntregaSabado.content}</Text>
                <Text style={css.resposta}>Obs Final: {servico.cServico.children[9].obsFim.content}</Text>
                <Text style={css.resposta}>Código Final: {servico.cServico.children[10].Erro.content}</Text>
                <Text style={css.resposta}>Mensagem de Erro: {servico.cServico.children[11].MsgErro.content}</Text>

              </Fragment>)
          })}
        </KeyboardAvoidingView>
        {/* {console.log(result)} */}
      </View >
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  logo: {
    textAlign: 'center',
    color: '#694db4',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#3a3b3d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 250,
    backgroundColor: '#c3c5cb',
    color: '#eff8ff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 7,
    borderRadius: 7
  },
  button: {
    backgroundColor: '#694db4',
    alignItems: 'center',
    padding: 15,
    borderRadius: 7,
    marginTop: 15
  },
  textButton: {
    color: '#eff8ff',
    fontSize: 18
  },
  text: {
    color: '#eff8ff',
    fontSize: 18,
    marginTop: 15,
    backgroundColor: '#0d0c0f',
    padding: 5
  },
  retorna: {
    marginTop: 10
  },
  viu: {
    marginVertical: 12
  }
})
