require("dotenv").config()
const express = require("express")

const app = express()

const cors = require("cors")

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")
    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method == 'OPTIONS') {
    
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        const requestedHeaders = req.header('Access-Control-Request-Headers')
        
        if (requestedHeaders) {
        
            res.header('Access-Control-Allow-Headers', requestedHeaders);
        }
        
        
        return res.status(200).json({});
    }
    next();
});

app.use(cors({
    origin:"*"
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
