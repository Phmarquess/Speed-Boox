import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      
      },
      edcao:{
        backgroundColor:'#fff',
        fontSize:19,
        padding:7,
        marginTop:15,
        textAlign:'center',
      },
      edcao2:{
        fontSize:19,
        marginTop:25,
        marginBottom:-10,
        textAlign:'center',
        color:"green",
      },
      margin:{
        marginTop:25,
        
      },
      resposta:{
        fontSize:22,
        color:"#fff"
  
      },
      containerTop: {
        justifyContent: 'flex-start'
      },
      container2: {
          flex: 1,
          flexDirection:'row',
          backgroundColor: '#242426',
          alignItems: 'center',
          justifyContent: 'center',
      },button__home:{
        marginRight:'10%',
        marginLeft:'8%',
        alignItems: 'center',
        marginTop:'15%',
    },
      button_home2:{
        marginRight:'10%',
        marginLeft:'8%',
        alignItems: 'center',
        marginTop:'1%',
    },
    button_home3:{
      textAlign:'left'

    },
    area_title:{
      width: '80%',
      fontWeight:'bold',
      fontSize:20,
      color:'#000',
      textAlign:'center'

    },
    area_menu:{
      flexDirection: 'row',
      paddingTop: '5%',
      paddingBottom: '3%',
      width: '100%',
      backgroundColor:'#6646B1',
      alignItems:'center',
      justifyContent:'center'
    },
    button_logout:{
      textAlign:'right'
    },
    darkbg:{
      backgroundColor:'#333',

    },
    bgd:{
      backgroundColor:'#333',
    },
    margin2:{
      marginTop:"10%"

    },
    margin:{
      marginTop:"5%"

    },
    msg:{
      marginTop:"2%",
      fontWeight:'bold',
      fontSize:22,
      color:'red',
      
    },
    login_msg:(text='none')=>({
      fontWeight:'bold',
      fontSize:22,
      color:'red',
      display: text
    }),
    login_form:{
      width:'80%',
    },
    login_input:{
      backgroundColor:'#fff',
      fontSize:19,
      padding:7,
      marginBottom:15,
      textAlign:'center',
    },
    login_button:{
      padding:12,
      backgroundColor:"#6646B1",
      alignSelf:'center',
      borderRadius:2,
    },
    login_buttonText:{
      fontWeight:'bold',
      fontSize:19,
      color:'#000',
    },
    area_tab:{
      backgroundColor:'#6646B1',
      fontSize:20,
      fontWeight:'bold',
      color:'#333'

    },
    textHome:{ 
        color:'#6646B1',
        fontWeight: 'bold',
    },
    button__novo:{
        right:"-90%",
        bottom:"-270%",
        width:50,
        height:50,
        backgroundColor:'#6646B1',
        borderRadius:24,
    },
    img__novouser:{
        right:"-20%",
        marginTop:7,
        width:30,
        height:30,
    },
    cadastro__logomarca:{
        width:200,
        height:200,
        marginTop:"10%",
    },
    cadastro__input:{
        width:"95%",
        height:40,
        backgroundColor:'white',
        textAlign:'center',
        borderRadius:20,
        marginBottom:15,

    },
    text_center:{
      textAlign:'center',
    },
    qr__code:(display='flex')=>({
        width:'100%',
        height:'100%',
        backgroundColor:'#000',
        justifyContent:'center',
        display: display
    }),
    qr__form:(display='none')=>({
      width: '100%',
      display:display
    })
  });
  export{css};