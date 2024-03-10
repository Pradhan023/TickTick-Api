const mongo = require("mongoose")

const userSchema = mongo.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Provide the email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Provide the password"]
    }
},
{timestamps:true}
)

const Usermodel = mongo.model("TickTickUser",userSchema)

module.exports = Usermodel