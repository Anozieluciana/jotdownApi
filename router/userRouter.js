const express = require("express")
const router = express.Router()
const UserRouter = require("../controller/userController")
const Ava = require("../utils/multer")



router.post("/",Ava.upload, UserRouter.register)
router.get("/", UserRouter.getAllUser)






module.exports = router