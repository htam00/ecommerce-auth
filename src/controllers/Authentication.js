const passport = require('passport')
const Customer = require('../models/Customers')

/*
 * Local Authentication
 */
const signinAuth = async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => { 
		if (err) { 
			return next(err) 
		} 

		if(!user) {
			return res.redirect(`/login?info=${info}`)
		}

		req.logIn(user, (err) => {
			if (err) {
				return next(err)
			}
			return res.redirect('/')
		})
	})(req, res, next)
}

const signupAuth = async (req, res) => {
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

/*
 * Pages Routes
 */
const signinPage = (req, res) => {
	res.send('Login Page')
}

const signupPage = (req, res) => {
	res.send('Signup Page')
}

const profilePage = (req, res) => {
	res.json(req.user)
}

/*
 * Session Exit Account
 */
const logout = () => { 
	// ... 
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
	profilePage
}
