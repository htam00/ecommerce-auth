const passport = require('passport')
const Customer = require('../models/Customers')

/*
 * Local Authentication
 */
const addCustomer = async (req, res) => {

}

/* 
 * Facebook Authentication
 */
const facebookAuth = passport.authenticate('facebook')

const facebookAuthCallback = passport.authenticate('facebook', { 
	successRedirect: "/",
	failureRedirect: "/fail"
})

/*
 * Google Authentication
 */
const googleAuth = passport.authenticate('google', { scope: '' })

const googleAuthCallback = passport.authenticate('google', { 
	successRedirect: "/",
	failureRedirect: "/fail",
})

/*
 * Message Body 
 */
const failMessage = (req, res) => {
	res.send("Failure attemp")
}

const successMessage = (req, res) => {
	res.send("Success")
}


module.exports = { 
	addCustomer,
	facebookAuth,
	facebookAuthCallback,
	googleAuth,
	googleAuthCallback,
	failMessage,
	successMessage
}
