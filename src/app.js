require('dotenv').config()

// Thirty-Party Module 
const app = require('express')()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const { urlencoded, 
	json 
} = require('body-parser')

// Import Module of Configure
// const db = require('./config/database')
const pass = require('./config/passport/configure')

// Import Controllers of Authentication
const { signinAuth,
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
} = require('./controllers/Authentication')

/*
 * -------- Mongoose Session ------
 */
const connection = mongoose.createConnection(process.env.MONGO_URI)
const sessionStore = new MongoStore({
	mongooseConnection: connection,
	collection: 'sessions'
})

// Configure
pass.configure()

// Middleware
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: sessionStore
}))
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.get('/login', signinPage)
app.get('/signup', signupPage)
app.post('/login', signinAuth)
app.post('/signup', signupAuth)

app.get('/auth/facebook', facebookAuth)
app.get('/auth/facebook/callback', facebookAuthCallback)

app.get('/auth/google', googleAuth)
app.get('/auth/google/callback', googleAuthCallback)

app.get('/fail', failMessage)
app.get('/', successMessage)
app.get('/profile', profilePage)

// Module Export to ServerFile
module.exports = { app }
