const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const sendEmailService = require('../services/email.service.js')

const registerUser = async(req,res)=>{
    const {email,name,password} = req.body

    const isEmailExist = await userModel.findOne({email:email})
    if(isEmailExist){
        return res.status(422).json({
            message:"User already exist with email",
            status:"failed"
        })
    }
    const user = await userModel.create({email,name,password})
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie("token", token)
    res.status(201).json({
        message:"User registered successfully",
        status:"success",
        data:{
            user:{
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        }
    })

    await sendEmailService.sendRegistrationEmail(user.email, user.name)


}

/**
 * -user login controleer
 * -post /api/auth/login
 *
 */
const loginuser = async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("password")
    if (!user){
        return res.status(404).json({
            message:"User not found",
            status:"failed"
        })
    }
    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid email or password",
            status: "failed"
        })
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie("token", token)
    return res.status(201).json({
        message:"User registered successfully",
        status:"success",
        data:{
            user:{
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        }
    })


}

module.exports = {registerUser,loginuser}
