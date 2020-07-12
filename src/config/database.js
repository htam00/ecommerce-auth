const mongoose = require('mongoose')

const uri = process.env.MONGO_URI || ''
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true

}
const connect = () => {
	mongoose.connect(uri, options)
	.then(() => {
	 console.log('MONGODB Connected...')
	}).catch(err => console.error(err))
}

module.exports = { connect }
