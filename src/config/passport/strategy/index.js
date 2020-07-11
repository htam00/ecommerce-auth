const { signinStrategy, signupStrategy } = require('./local')
const { facebookStrategy } = require('./facebook')
const { googleStrategy } = require('./google')

module.exports = {
	signinStrategy,
	signupStrategy,
	facebookStrategy,
	googleStrategy
}
