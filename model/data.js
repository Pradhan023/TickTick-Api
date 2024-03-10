const mongo = require("mongoose")

const dataSchema = mongo.Schema({
    user_id:{
        type:String
    },
    input:{
        type:String
    },
    checked:{
        type:Boolean
    }
})

const dataModel = mongo.model("TickListData",dataSchema);

module.exports = dataModel