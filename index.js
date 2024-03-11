require("dotenv").config()
const express = require("express")

const app = express()

const cors = require("cors")

app.use(cors({
    origin:"https://playful-eclair-831f88.netlify.app/"
}))

const connection = require("./config/config")
const userroute = require("./route/routeauth")
const dataroute = require("./route/dataroute")

// middleware
app.use(express.json())
// Enable preflight for all routes
app.options('*', cors());

app.use(userroute)
app.use(dataroute)

const Port = process.env.Port || 8000
const Hostname = process.env.Host_Name

const server = app.listen(Port,Hostname,async()=>{
    try{
        await connection();
        console.log("Sever is live on Port " , Port);
    }
    catch(err){
        console.log("Server error ", err);
    }
})
