const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const Customer = require('./../../../models/Customers')

const { GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL
} = process.env

const googleStrategy = new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: GOOGLE_CALLBACK_URL
}, 
(accessToken, refreshToken, profile, done) => {
	Customer.findOrCreate({ 
		googleId: profile.id 
	}, (err, customer) => {
		return done(err, customer)
	})
})

module.exports = { googleStrategy }
