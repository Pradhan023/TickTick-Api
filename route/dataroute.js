const { addController, updateController, allDataController, deleteController } = require("../controller/allData")
const auther = require("../middleware/auther")

const dataroute = require("express").Router()
dataroute.use(auther)

dataroute.post('/addData',addController)
dataroute.post('/updatedata',updateController)
dataroute.get('/getdata',allDataController)
dataroute.post('/delete',deleteController)

module.exports = dataroute