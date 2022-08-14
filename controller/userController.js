const UserModel = require("../model/userModel");
const userModel = require("../model/userModel");
const bcrypt = require ("bcrypt")
const cloudinary = require(".././utils/cloudinary")

const register =  async (req,res) =>{
	try{
		const {userName,email,password,} = req.body
		const pic =await cloudinary.uploader.upload(req.file.path)
		const salt = await bcrypt.genSalt(10)
		const hashed = await bcrypt.hash(password, salt) 
		const createUser = await UserModel.create({
			userName,email,password:hashed,avatar:pic.secure_url,avatarID:pic.public_id}
		)
		res.status(200).json({message:"success",data:createUser})
	}catch(error){
		res.status(400).json({mssg:"error registering",data:error.message})
	}
}


const getAllUser = async(req,res)=>{
	try{
		const user = await userModel.find()
		res.status(200).json({
			data:user,
			status:"success"
		})
	}
	catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}

const getOneUser = async(req,res)=>{
	try{
		const user = await userModel.findById(req.params.id)
		res.status(200).json({
			data:user,
			status:"success"
		})
	}
	catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}


const updateUser = async(req,res)=>{
	try{
		const user = await userModel.findByIdAndUpdate(req.params.id,res.body, {new:true})
		res.status(200).json({
			data:user,
			status:"success"
		})
	}
	catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}
const deleteUser = async(req,res)=>{
	try{
		const user = await userModel.findByIdAndDelete(req.params.id)
		res.status(200).json({
			data:user,
			status:"success"
		})
	}
	catch(error){
		res.status(500).json({
			message:error.message
		})
	}
}

const signInUser =  async (req,res) =>{
	try{
		const {email} = req.body
		const createUser = await UserModel.findOne({email})
		if(createUser){
			res.status(200).json({message:"user signIn",data: createUser})
		}else{
			res.status(200).json({message:"error siging "})
		}
	}catch(error){
		res.status(400).json({mssg:"error signInUser",data:error.message})
	}
}

// const createDiary = async (req,res) =>{
// 	try{
// 		const {			
// 			title,
// 			message,
// 		} = req.body
// 		const UserId = await UserModel.findById(req.params.id)

// 		const Dairy = new DairyModel({
// 			title,
// 			message,
// 		})
// 		Dairy.user = UserId
// 		Dairy.save()
// 		// UserId.diary.push( mongoose.Types.ObjectId(Dairy._id))
// 		UserId.diary.push(Dairy._id)
// 		UserId.save()

// 		res.status(200).json({mssg:"success", data : Dairy})
// 	}catch(error){
// 		res.status(400).json({mssg:"error creating dairy",data:error.message})
// 	}
// }

module.exports = {
	register,
	signInUser,
	getAllUser,
	getOneUser,
	updateUser,
	deleteUser
}