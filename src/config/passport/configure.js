const passport = require('passport')

const { signinStrategy, 
	signupStrategy,
	facebookStrategy,
	googleStrategy
} = require('./strategy')

const { serialize, 
	deserialize 
} = require('./serialization')

const CustomerModel = require('./../../models/Customers')

// configure activate passport
const configure = () => {
	passport.serializeUser(serialize)
	passport.deserializeUser(deserialize)
	passport.use(signinStrategy)
	passport.use(signupStrategy)
	passport.use(facebookStrategy)
	passport.use(googleStrategy)
}

module.exports = { configure }
