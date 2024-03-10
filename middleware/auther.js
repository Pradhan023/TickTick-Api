 const jwt = require("jsonwebtoken")

 const auther = (req,res,next)=>{
    const header = req.headers.Authorization || req.headers.authorization;
    if(header && header.startsWith("Bearer")){
        const token = header.split(" ")[1];
        jwt.verify(token,process.env.Secret_key,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error("User is not authorized",err)
            }
            req.user = decoded.user;
            next()
        })
        if(!token){
            res.status(204)
            throw new Error("Invalid Token")
        }
    }
 }

 module.exports = auther