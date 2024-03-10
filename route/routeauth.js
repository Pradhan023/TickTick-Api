const userroute = require("express").Router()
const {regController,loginController} = require("../controller/authentication")

userroute.post('/login',loginController);
userroute.post('/register',regController)

module.exports = userroute