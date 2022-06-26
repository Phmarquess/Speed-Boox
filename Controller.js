const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const models=require('./models');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets'));
let user=models.User;
let tracking=models.Tracking;
let product=models.Product;
let filiais=models.Filiais;

//Comfirmacao de Usuario
app.post('/login',async (req,res)=>{
    let response=await user.findOne({
        where:{email:req.body.email, password: req.body.password}
    });
    if(response === null){
        res.send(JSON.stringify('error'));
    }else{
        res.send(response);
    }
});
//nova filial
app.post('/novaFilial',async (req,res)=>{
    let createUser=await filiais.create({
        cidade: req.body.cidade,
        endereco: req.body.endereco,
        createdAt: new Date(),
        updatedAt: new Date()
   });
});

//Exibir o local do rastreio
app.post('/rastreio', async (req,res)=>{
    let response=await tracking.findOne({
        where:{code:req.body.code}
    });
    if(response === null){
        res.send(JSON.stringify(`Nenhum produto encontrado`));
    }else{
        res.send(JSON.stringify(`Sua encomend está: ${response.local}.`))
    }
});

//Update dos dados da mercadoria
app.post('/update', async (req,res)=>{
    let response=await tracking.findOne({
        where: {code: req.body.code}
    });
    response.local=req.body.local;
    response.updatedAt=new Date();
    response.save();
    res.send(JSON.stringify('Dados foram atualizados com sucesso!'));
 });


//Pegar os dados do produto
app.post('/searchProduct', async (req,res)=>{
    let response=await tracking.findOne({
        where: {code: req.body.code}
    });
    res.send(JSON.stringify(response));
});

//filiais
app.post('/filialCidade', async (req,res)=>{
    let response=await filiais.findOne({
        where: {cidade: req.body.cidade}
    });
    if(response === null){
        res.send(JSON.stringify('E-mail atual invalido'));
    }else{
        res.send(JSON.stringify(response));
        }
    
});

//Criação de usuario no banco
app.post('/createUser',async (req,res)=>{
    let createUser=await user.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
   });
});

//alterar senha do usuario
app.post('/verifyPass',async (req,res)=>{
    let response=await user.findOne({
        where:{id:req.body.id, password:req.body.senhaAntiga}
    });
    if(response === null){
        res.send(JSON.stringify('Senha antiga não confere'));
    }else{
        if(req.body. novaSenha === req.body.confNovaSenha){
            response.password=req.body.novaSenha;
            response.save();
            res.send(JSON.stringify('Senha atualizada com sucesso!'));
        }else{
            res.send(JSON.stringify('Nova Senha e Confirmação não conferem!'));
        }
    }
});

//alterar Email
app.post('/verifyEmail',async (req,res)=>{
    let response=await user.findOne({
        where:{id:req.body.id, email:req.body.email}
    });
    if(response === null){
        res.send(JSON.stringify('E-mail atual invalido'));
    }else{
        if(req.body.novoEmail === req.body.confNovoEmail){
            response.email=req.body.novoEmail;
            response.save();
            res.send(JSON.stringify('Email atualizado com sucesso!'));
            
        }else{
            res.send(JSON.stringify('Novo E-Mail e Confirmação não conferem!'));
        }
    }
});

//Criação do produto no banco
app.post('/create',async (req,res)=>{
    let trackingId='';
   await tracking.create({
     userId: req.body.userId,
       code: req.body.code,
       local: req.body.local
   }).then((response)=>{
       trackingId+=response.id;
   });

   await product.create({
       trackingId: trackingId,
       name: req.body.product
   });

   QRCode.toDataURL(req.body.code).then(url=>{
    QRCode.toFile(
        './assets/img/code.png',
        req.body.code
    );
    res.send(JSON.stringify(url));
})

});
// Area de contato do cliente 
app.post("/send-email", async(req,res)=>{

    let response=({
        where:{from:req.body.from, subject:req.body.subject, text:req.body.text}
    });

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0ed32650774dd3",
        pass: "0ae2a684be4f28"
      }
    });
  
    var message = {
      from: req.body.from,
      to: "spedbox@sender.com",
      subject: req.body.subject,
      text: req.body.text,
    };
  
  
   transport.sendMail(message,function(err){
     if (err) return res.status(400).json({
       erro: true,
       mensagem: "E-mail nao enviado com sucesso!!"
     });
   });
  
    return res.json({
      erro:false,
      mensagem:"Logo entraremos em contato!!"
    });
  });

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});