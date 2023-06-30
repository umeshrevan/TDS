const Users = require('../schemas/usersSchema')
const Passbook = require('../schemas/passbookSchema')
const {status, message} = require('../messages/messages')
const Withdraw = require('../schemas/withdrawSchema')
const TDS = require('../schemas/TDSSchema')

const createPassbook = async(req,res)=>{
	
	
	const {iUserID, nAmount, eTransactionType} = req.body
	
	let user = await Users.findOne({_id: iUserID})
	// console.log(user._id)
	let oldPassbook = await Passbook.findOne({iUserID: iUserID}).sort({_id:-1}).limit(1)
	console.log(oldPassbook)
	
	if(eTransactionType === 'winning'){
		const passbook = {
			iUserID:user._id,
			nTotalBalance: oldPassbook.nTotalBalance+nAmount,
			nAmount,
			eTransactionType
		}
		const data = await Passbook.create(passbook)
		if(data){
			res.status(status.statusSuccess).json(data)
		}
		else{
			res.status(status.badRequest).json(message.dataNotFound)
		}
	}
	else if(eTransactionType === 'deposit'){

		const passbook = {

			iUserID:user._id,
			nTotalBalance:oldPassbook.nTotalBalance,
			nAmount,
			eTransactionType,
			nDepositBalance: oldPassbook.nDepositBalance+nAmount,
		}
		const data = await Passbook.create(passbook)
		if(data){
			res.status(status.statusSuccess).json(data)
		}
		else{
			res.status(status.badRequest).json(message.dataNotFound)
		}
	}

	else if(eTransactionType === 'withdraw'){

		const passbook = {

			iUserID:user._id,
			nTotalBalance:oldPassbook.nTotalBalance-nAmount,
			nAmount,
			eTransactionType,
			nDepositBalance: oldPassbook.nDepositBalance,
		}
		const withdraw = {
			iUserID:user._id,
			nAmount
		}
		const data1 = await Passbook.create(passbook)
		const data2 = await Withdraw.create(withdraw)
		if(data1){
			res.status(status.statusSuccess).json({data1:data1, data2:data2})
		}
		else{
			res.status(status.badRequest).json(message.dataNotFound)
		}
	}	

	else if(eTransactionType === 'TDS'){

		const passbook = {
			iUserID:user._id,
			nTotalBalance:oldPassbook.nTotalBalance-nAmount,
			nAmount,
			eTransactionType,
			nDepositBalance: oldPassbook.nDepositBalance,
		}
		const withdraw = {
			iUserID:user._id,
			nAmount
		}

		//A
		const totalWithdraw = await Withdraw.aggregate([
			{
				$match: {
					iUserID:user._id,
					createdAt: {$gte: new Date('2023-06-01'),$lt: new Date('2023-06-31')}
				},
			},
			{
				$group: {
					_id: null,
					totalWithdraw: { $sum: '$nAmount' },
				},
			},
			{
				
				$project: {
					_id: 0,
					totalWithdraw: 1
				},
			},
		])
		
		let A
		if(totalWithdraw.length == 0){
			const pastTotalWithdraw = 0
			const requestedWithdrawAmount = nAmount

			A = pastTotalWithdraw + requestedWithdrawAmount
			console.log('A data',A)
		}
		else{
			const withdrawData =totalWithdraw
			const [{totalWithdraw:pastTotalWithdraw}]=withdrawData

			const requestedWithdrawAmount = nAmount

			A = pastTotalWithdraw + requestedWithdrawAmount
			console.log('A data',A)
		}

		


		//B
		const totalDeposit = await Passbook.aggregate([
			{
				$match: {
					iUserID:user._id,
					eTransactionType: 'deposit',
					createdAt: {$gte: new Date('2023-06-01'),$lte: new Date('2023-06-30')}
				},
			},
			{
				$group: {
					_id: null,
					totalDeposit: { $sum: '$nAmount' },
				},
			},
			{
				
				$project: {
					_id: 0,
					totalDeposit: 1
				},
			},
		])
		let B
		if(totalDeposit.length == 0){
			const totalDeposit = 0
			B = totalDeposit
			console.log('B data',B)
		}
		else{
			const depositData =totalDeposit
			let [{totalDeposit:B}]=depositData
			console.log('B data', B)
		}


		//C
		const nTotalBalance = await Passbook.aggregate([

			{
				$match: {
					iUserID:user._id,
					createdAt: { $lt: new Date('2023-06-01') }
				},
			},
			
			{$sort:{
				createdAt: -1
			},},
			{
				
				$project: {
					_id: 0,
					nTotalBalance: 1
				},
			},
			{$limit:1} 
		])
		let C
		if(nTotalBalance.length == 0){
			const nTotalBalance = 0
			C = nTotalBalance
		}
		else{
			const balanceData =nTotalBalance
			let [{nTotalBalance:C}]=balanceData
			console.log('C Value', C)
		}


		//D
		const totalTDSAmount = await TDS.aggregate([
			{
				$match: {
					iUserID: user._id,
					createdAt: {$gte: new Date('2023-06-01'),$lte: new Date('2023-06-30')}

				},
			},
			{
				$group: {
					_id: null,
					totalTDSAmount: { $sum: '$nOriginalAmount' },
				},
			},
			{
				
				$project: {
					_id: 0,
					totalTDSAmount: 1
				},
			},
		])
		let D
		if(totalTDSAmount.length == 0){
			const totalTDSAmount = 0
			D = totalTDSAmount
			console.log('D data',D)
		}
		else{
			const TDSData =totalTDSAmount
			let [{totalTDSAmount:D}]=TDSData
			console.log('D data', D)
		}

		console.log(A,B,C,D)
		const TaxableAmount = A-B-C-D
		const percentage = 30
		const netTDS = (TaxableAmount * percentage) / 100
		const finalAmount = TaxableAmount - netTDS
		const tds = {
			iUserID:iUserID,
			nAmount:netTDS,
			nOriginalAmount:finalAmount,
			nPercentage:30
		}
		const data1 = await Passbook.create(passbook)
		const data2 = await Withdraw.create(withdraw)
		const data3 = await TDS.create(tds)
		console.log(tds)
		if(data1){
			return res.status(status.statusSuccess).json({data1:data1, data2:data2, data3:data3})

		}
		else{
			return res.status(status.badRequest).json(message.dataNotFound)
		}
	}
}

module.exports = {createPassbook}