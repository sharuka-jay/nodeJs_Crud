const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const UserRoute =  require('./route/user')
const AuthRoute = require('./route/auth')

mongoose.connect('mongodb://localhost:27017/web3',{usenewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('Database Connection Established')
})

const app = express();

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.listen(3000,function(){
    console.log("server start on port 3000")
});

app.use('/user',UserRoute)
app.use('/api',AuthRoute)


///////// 

app.get('/login', function(req,res){
    res.render("login") 
})
app.get('/register', function(req,res){
    res.render("register") 
})