const express = require("express")
const { userModel } = require("../model/register.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userRouter = express.Router()


// User Register Route
userRouter.post("/signup",async(req,res)=>{
    const {email,password,confirmPassword} = req.body
  try {
    const userExists = await userModel.find({email})
    if(userExists.length){
        res.status(400).send({err:"User is already Present....Login"})
    }
    const hassPassword = bcrypt.hashSync(password,10)
    const hassconfPassword = bcrypt.hashSync(confirmPassword,10)
    const user = new userModel({...req.body,password:hassPassword,confirmPassword:hassconfPassword})
    await user.save()
    res.status(200).send({
        msg:"User is sucessfully registeres",
        newUser:user
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).send({"error":error.message})
  }
})

// User Login 
userRouter.post("/login",async(req,res)=>{
    const {email,password,confirmPassword} = req.body
    try {
        const userExists = await userModel.findOne({email})
        if(userExists){
            bcrypt.compare(password,userExists.password,(err,result)=>{
                if(err){
                    res.status(400).send({error:err.message})
                }
                const token = jwt.sign({userId:userExists.id,name:userExists.name},process.env.secretKey)
                if(token){
                   
                    res.status(200).send({
                        msg:"Login Sucessfull",token:token
                    })
                }
                
            })
        }
    } catch (error) {
        console.log("error",error.message)
        res.status(400).send({error:error.message})
    }
})


module.exports ={
    userRouter
}