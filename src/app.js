require('dotenv').config()

const app = require('express')()
const passport = require('passport')
const { json } = require('body-parser')
// const db  = require('./config/database')
const pass = require('./config/passport/configure')
const { addCustomer, 
	facebookAuth,
	facebookAuthCallback,
	googleAuth,
	googleAuthCallback,
	failMessage,
	successMessage
} = require('./controllers/Authentication')

pass.configure()

app.use(passport.initialize())
app.use(json())

app.post('/login', addCustomer)
app.get('/auth/facebook', facebookAuth)
app.get('/auth/facebook/callback', facebookAuthCallback)
app.get('/auth/google', googleAuth)
app.get('/auth/google/callback', googleAuthCallback)
app.get('/fail', failMessage)
app.get('/', successMessage)

module.exports = { app }
