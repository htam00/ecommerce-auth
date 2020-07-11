const { Schema, model } = require('mongoose')

const Customers = new Schema({
	name: String,
	email: String,
	password: String
})

module.exports = model('Customers', Customers)

