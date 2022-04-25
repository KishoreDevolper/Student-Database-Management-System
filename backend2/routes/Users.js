const express = require('express')
const users = express.Router()
const cors =require("cors")
const jwt=require("jsonwebtoken")
const bcrypt =require("bcrypt")
const User = require("../models/User")
const req = require('express/lib/request')
users.use(cors())

process.env.SECRET_KEY ='secret'

//register
users.post('/register',(req,res)=>{ 
    const today = new Date()
    const userData={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email :req.body.email,
        password:req.body.password,
        created:today

    }
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        if(!user){
            const hash =bcrypt.hashSync(userData.password,10)
            userData.password=hash
            console.log("data",userData)
            User.create(userData)
            .then(user=>{
                let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn:20000
                })
                res.json({token:token})
            })
            .catch(err=>{
                res.send('error'+ error)
            })
        }else{
            res.json({error:'user already existes'})
        }
    })
    .catch(err=>{
        // res.send({
        //     'kishore':err
        // })
        res.send('error:' + err)
    })
    
})

//login

users.post('/login',(req,res)=>{
            User.findOne({where:{
                email:req.body.email
            }})
            .then(user=>{
                console.log("data -> ",user)
                if(bcrypt.compareSync(req.body.password,user.password)){
                     let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                     expiresIn:2000000
                    })
                    res.json({token:token})
                    console.log(token)
                }else{
                    res.send("invalid user id or password")
                    console.log(user)
                }
            })
            .catch(err=>{
                res.send('error'+ err)
            })

            // //profile
            // users.get('/profile',(req,res)=>{
            //     var decoded =jwt.verify(req.headers['authorization'],process.env.port.SECRET_KEY)
            //     users.findOne({
            //         where:{
            //             id:decoded.id
            //         }
            //     })
            //     .then(user=>{req
            //         if(user){
            //             res.json(user)
            //         }else{
            //             res.send("user does not exist")
            //         }
            //     })
            //     .catch(err=>{
            //         res.send('error'+ err)
            //     })
            // })

            // //PROFILE
            // users.get('/profile',(req,res)=>{
            //     var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
            //     User.findOne({
            //         where:{
            //             id:decoded.id
            //         }
            //     })
            //     .then(user=>{
            //         if(user){
            //             res.json(user)
            //         }else{
            //             res.send('user does not exist')
            //         }
            //     })
            //     .catch(err=>{
            //         res.send('error'+ err)
            //     })
            // })
})
module.exports = users