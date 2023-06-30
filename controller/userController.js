const Users = require('../schemas/usersSchema')
const {status, message} = require('../messages/messages')

const createUser = async(req,res)=>{
	try{
		const {sUserName } = req.body
		// const existUser = await Users.findOne({sUserName: sUserName})
		// if(existUser){
		// 	res.status(status.alreadyExist).json(message.existUser)
		// }
		// else{
		const user = {
			sUserName	
		}
		const data = await Users.create(user)
		console.log(data)
		if(data){
			res.send('Done')
			//res.status(status.statusSuccess).json(data)
		}
		else{
			res.status(status.badRequest).json(message.dataNotFound)
		}
		//}
	}
	catch(error){
		console.log(error)
	}				
}
module.exports = {createUser}