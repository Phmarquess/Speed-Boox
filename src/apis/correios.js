import Axios from 'axios';
// import xml2js from 'xml2js';

const buscarFrete = async ({
    nCdEmpresa,
    sDsSenha,
    nCdServico,
    sCepOrigem,
    sCepDestino,
    nVlPeso,
    nCdFormato,
    nVlComprimento,
    nVlAltura,
    nVlLargura,
    nVlDiametro }) => {
    let url = (`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=${nCdEmpresa}&sDsSenha=${sDsSenha}&sCepOrigem=${sCepOrigem}&sCepDestino=${sCepDestino}&nVlPeso=${nVlPeso}1&nCdFormato=${nCdFormato}&nVlComprimento=${nVlComprimento}&nVlAltura=${nVlAltura}&nVlLargura=${nVlLargura}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${nCdServico}&nVlDiametro=${nVlDiametro}&StrRetorno=xml&nIndicaCalculo=3`)
    const data = {
        nCdEmpresa: "",
        sDsSenha: "",
        nCdServico,
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nVlDiametro
    };
    const headers = {
        "Content-Type": "text/xml; charset=utf-8",
    };
    const response = await Axios.post(url, data);
    // console.log(response.data);
    return response.data;
}



export { buscarFrete };