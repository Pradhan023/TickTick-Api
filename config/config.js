const mongo =  require("mongoose")
require("dotenv").config()

const connection = async()=>{
    try{
        const conn = await mongo.connect(process.env.MONGO_URL)
        console.log(`Database is connected to mongodb ${conn.connection.host}`);
    }
    catch(err){
        console.log("Error in mongodb ", err);
    }
}

module.exports = connection