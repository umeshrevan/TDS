const express = require('express')
require('dotenv').config()
const config = require('./config/config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))



const userRoute = require('./routes/routes')
const connectDb = require('./database/dbConnect')
connectDb()

app.use('/', userRoute)

app.all('*', (req, res) => {
	res.json({ messages: 'No routes found' })
})

app.listen(config.port, () => {
	console.log(`Server listening on port ${config.port}`)
})