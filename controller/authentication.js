const Usermodel = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const regController = async(req,res)=>{
    const data = req.body;
    const{username,email,password} = data;
    const checkUser = await Usermodel.findOne({email:email});

    if(!username || !email || !password){
        return res.status(400).json({msg:"All Field is mendatory"})
    }

    if(!checkUser){
        const hashpassword = bcrypt.hashSync(password,10)
        const newObj = {...data,password:hashpassword}
        await Usermodel.create(newObj)
        return res.status(201).json({msg:"User is Successfully Registered"})
    }
    else{
        return res.status(200).json({msg:"User is already registered with this email"})
    }
}

const loginController = async (req,res)=>{
    const{email,password} = req.body;
    const checkUser = await Usermodel.findOne({email:email})
    // console.log(checkUser.id);

    if(!email || !password){
        return res.status(400).json({msg:"All Field is mendatory"})
    }

    if(checkUser && bcrypt.compare(password,checkUser.password)){
        const accessToken = jwt.sign({
            user:{
                username:checkUser.username,
                email:checkUser.email,
                id:checkUser._id
            }
        },process.env.Secret_key,{expiresIn:"1d"})
        return res.status(200).json({
            msg:"User is Successfully Login",user:checkUser.username,accesstoken:accessToken
        })
    }
    else{
        return res.status(200).json({msg:"Email or Password is invalid"})
    }
}

module.exports = {regController,loginController}