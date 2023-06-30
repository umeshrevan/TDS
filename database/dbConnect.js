const mongoose=require('mongoose')
const connectDb = async()=>{
	try {
		const conn=await mongoose.connect('mongodb+srv://umesh:1234@cluster0.1xxniuy.mongodb.net/TDS')
		console.log('MongoDb connected '+ conn.connection.host)
	}
	catch(error){
		console.log(error)
		process.exit(1)
	}}

module.exports=connectDb