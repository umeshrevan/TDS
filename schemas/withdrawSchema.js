const mongoose = require('mongoose')
const withdrawSchema = new mongoose.Schema({
	iUserID:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},

	nAmount:{
		type:Number,
		required:[true,'Please add a nAmount'],
	},

	eStatus:{
		type:String,
		default: 's',
	},
},{timestamps:true})
const Withdraw = mongoose.model('withdraws',withdrawSchema)
module.exports = Withdraw