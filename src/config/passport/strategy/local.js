const LocalStrategy = require('passport-local').Strategy
const signinStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
}, (email, password, done) => {

})

const signupStrategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
}, (req, email, password, done) => {

})

module.exports = { 
	signinStrategy, 
	signupStrategy 
}
