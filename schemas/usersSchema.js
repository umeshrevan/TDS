const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
	sUserName:{
		type:String,
		required:[true,'Please add a user name'],
	}

	// sPassword:{
	// 	type:String,
	// 	required:[true,'Please add a password'],
	// },

	// nAmount:{
	// 	type: Number,
	// 	required:[true,'Please add an amount']
	// }
},{timestamps:true})
const Users=mongoose.model('users',usersSchema)
module.exports=Users