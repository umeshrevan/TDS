const mongoose = require('mongoose')
const passbookSchema = new mongoose.Schema({
	iUserID:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'   
	},
    
	nTotalBalance:{
		type:Number,
		default:0,
		//required:[false,'Please add a nTotalBalance'], //winning
	},

	nAmount:{
		type:Number,
		required:[true,'Please add a nAmount'],  //any transactoin balance
	},

	eStatus:{
		type:String,
		default: 's',
	},

	eTransactionType:{
		type:String,
		enum : ['deposit','withdraw','winning','TDS'],
	},

	nDepositBalance:{
		type:Number,
		default:0,
		//required:[true,'Please add a nDepositBalance'],  //deposit balance
	},
},{timestamps:true})
const Passbook = mongoose.model('Passbook',passbookSchema)
module.exports = Passbook