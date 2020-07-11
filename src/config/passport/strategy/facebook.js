const FacebookStrategy = require('passport-facebook').Strategy
const Customer = require('./../../../models/Customers')

const {
	FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET,
	FACEBOOK_CALLBACK_URL,
} = process.env

const facebookStrategy = new FacebookStrategy({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: FACEBOOK_CALLBACK_URL,

}, 
(accessToken, refreshToken, profile, done) => {
	const { email, 
		first_name, 
		last_name
	} = profile._json;
	
	const userData = { 
		email,
		first_name: first_name,
		last_name: last_name,
	};

	new Customer(userData).save()
	done(null, profile)

})

module.exports = { facebookStrategy }


