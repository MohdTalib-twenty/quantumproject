const express = require('express')
const cors = require('cors')
const connectdDb=require('./config/config')
const User= require('./Model/User')
const jwt = require('jsonwebtoken')
connectdDb();
const app = express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT || 8000;
const SECRET_KEY="123456789mnbvcxlkjhgfdspoiuytrew098765432_)(*&^%$#@";


app.post('/signup',(req,res)=>{
    const {name,email,dateOfBirth,password}=req.body;
            User.findOne({email:email},async(err,user)=>{
                if(user){
                    res.send({message : "User Already exists"});
                }else{
                    const user = new User(req.body);
                    const result = await user.save();
                    res.send({message : "Registeration Successfull",result});
                }
            })
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email : email},(err,user)=>{
        if(user){
            if(user.password === password){
                const token = jwt.sign({},SECRET_KEY)
                res.send({message : "You are LoggedIn",user,token});
            }else{
                res.send({message : "Incorrect Password"});
            }
        }else{
            res.send({message : "User not exists"});
        }
    })
})

app.get('/alldata',(req,res)=>{
    User.find({},(err,user)=>{
        if(user){
            res.send(user)
        }else{
            res.send(err);
        }
    })
})




app.listen(PORT,()=>{
    console.log('Server Connected')
})