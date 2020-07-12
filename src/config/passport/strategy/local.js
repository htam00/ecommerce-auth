const LocalStrategy = require('passport-local').Strategy

const Customer = require('./../../../models/Customers')

const signinStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (email, password, done) => {
	
})

const signupStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
}, (req, email, password, done) => {

	const createCustomer = () => {
		Customer.findOne({
			'email': email
		}, (err, user) => {
			if(err) {
				return done(err)
			}
			if(user) {
			const newCustomer = new Customer()
			newCustomer.email = email
			newCustomer.password = password
			newCustomer.save()
			}
		})
	}

	process.nextTick(createCustomer)
})

module.exports = { 
	signinStrategy, 
	signupStrategy 
}
