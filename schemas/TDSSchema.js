const mongoose = require('mongoose')
const TDSSchema = new mongoose.Schema({
	iUserID:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'   
	},

	nAmount:{
		type:Number,
		required:[true,'Please add a nAmount'],//120
	},

	nOriginalAmount:{
		type:Number,
		required:[true,'Please add a nOriginalAmount'],//400
	},

	nPercentage:{
		type:Number,
		required:[true,'Please add a nPercentage'],
	},

	eStatus:{
		type:String,
		default: 's',
	},
},{timestamps:true})
const TDS = mongoose.model('tds',TDSSchema)
module.exports = TDS