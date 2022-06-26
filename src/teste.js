import  { buscarFrete }  from "./apis/correios.js";
const main = async () => {
  const retorno = await buscarFrete("", "", "04014", '70002900', '04547000', 3, 1, 20, 20 , 20, 0);
  console.log(retorno)
  }
  main();