const dataModel = require("../model/data")

const addController = async (req,res)=>{
    const data = req.body;
    const newObj = {...data,user_id:req.user.id};
    const created = await dataModel.create(newObj);
    console.log(created);
    return res.status(201).json({msg:"Added"})
}

// get data 
const allDataController = async(req,res)=>{
    const data = await dataModel.find({user_id:req.user.id})
    return res.status(200).json(data)
}

// update
const updateController = async(req,res)=>{
    const{in_id,input,checked} = req.body;
    const update = await dataModel.findOneAndUpdate({_id:in_id},{$set:{input:input,checked:checked}})
    res.status(201).json({msg:"Updated"})
}

// delete
const deleteController = async(req,res)=>{
    const {in_id} = req.body;
    await dataModel.deleteMany({_id:in_id})
    return res.status(200).json({msg:"Deleted"})
}

module.exports = {addController,updateController,allDataController,deleteController}