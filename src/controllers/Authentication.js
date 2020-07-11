const Customer = require('../models/Customers')

const addCustomer = async (req, res) => {

}

const findCustomer = async (req, res) => {
 let id = '5f0937912bc51d1d637c40d3'
 await Customer.findById(id, 
	 (err, customer) => { 
		 if(err) console.error(err)
		 console.log(customer)
	 })
}

module.exports = { addCustomer, findCustomer }
