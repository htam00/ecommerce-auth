const LocalStrategy = require('passport-local').Strategy

const Customer = require('./../../../models/Customers')

const { generateHash,
	validPassword 
} = require('./../validate')

const signinStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (email, password, done) => {
	
})

const signupStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
 const createCustomer = () => {
	Customer.findOne({'email': email},
		(err, user) => {
		 if(err) {
			return done(err)
		 }

		 if(user) {
			 return done(null, false, req.flash('signupMessage', 'That email is already taken'))
		 } else {

		   const newCustomer = new Customer()
		   newCustomer.email = email
		   newCustomer.password = generateHash(password)
		   newCustomer.save((err) => {
			   if(err) {
				   throw err
			   } 
			   return done(null, newCustomer)
		   })
		 }
		})
 }

 process.nextTick(createCustomer)
})

module.exports = { 
	signinStrategy, 
	signupStrategy 
}
