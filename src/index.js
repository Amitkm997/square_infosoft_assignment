
const express=require("express");
const bodyParser=require("body-parser");
const route=require('./routes/route.js');
const mongoose=require('mongoose');


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://functionup:K3OCHkFxsJsV53MA@cluster0.e4rwd2y.mongodb.net/square_infosoft',
{useNewUrlParser:true})
.then(console.log('mongodb connected'))
.catch((err)=>console.log(err));


app.use('/',route);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running on port "+(process.env.PORT || 3000))
});



