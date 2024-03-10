require("dotenv").config()
const express = require("express")

const app = express()

const cors = require("cors")

app.use(cors())

const connection = require("./config/config")
const userroute = require("./route/routeauth")
const dataroute = require("./route/dataroute")

// middleware
app.use(express.json())
app.use(userroute)
app.use(dataroute)

const Port = process.env.Port || 8000

app.listen(Port,async()=>{
    try{
        await connection();
        console.log("Sever is live on Port " , Port);
    }
    catch(err){
        console.log("Server error ", err);
    }
})