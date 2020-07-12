const { Schema, model } = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Customers = new Schema({
	name: String,
	email: String,
	password: String
})

Customers.plugin(passportLocalMongoose)

module.exports = model('Customers', Customers)

