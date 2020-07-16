const passport = require('passport')
const Customer = require('../models/Customers')

/*
 * Local Authentication
 */
const signinAuth = passport.authenticate('local-signin', {
	successRedirect: '/profile',
	failureRedirect: '/signin',
	successFlash: true
})


const signupAuth = passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
})


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
	console.log(req.session)
}

/*
 * Pages Routes
 */
const signinPage = (req, res) => {
	const signinMessage = req.flash('signinMessage')
	res.send(`Login Page\n${signinMessage}`)
	console.log(signinMessage)
}

const signupPage = (req, res) => {
	const signupMessage = req.flash('signupMessage')
	res.send(`SignupPage\n${signupMessage}`)
}

const profilePage = (req, res) => {
	res.json(req.user)
}

/*
 * Session Exit Account
 */
const logout = (req, res) => { 
	req.logout()
	res.redirect('/login')
}

/*
 * Logged Confirm
 */
const isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

module.exports = { 
	signinAuth,
	signupAuth,
	facebookAuth,
	facebookAuthCallback,
	googleAuth,
	googleAuthCallback,
	failMessage,
	successMessage,
	signinPage,
	signupPage,
	profilePage,
	logout,
	isLoggedIn
}
