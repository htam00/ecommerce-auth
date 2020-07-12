require('dotenv').config()

// Thirty-Party Module 
const app = require('express')()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)
const { urlencoded, 
	json 
} = require('body-parser')
const cookieParser = require('cookie-parser')

// Import Module of Configure
const db = require('./config/database')
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
	profilePage,
	isLoggedIn
} = require('./controllers/Authentication')


/*
 * -------- Mongoose Session ------
 */
/*
const connection = mongoose.createConnection(process.env.MONGO_URI)

const sessionStore = new MongoStore({
	mongooseConnection: connection, 
	collection: 'sessions'
})
*/

// Configure
db.connect()
pass.configure()

// Middleware
app.use(cookieParser())
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

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
app.get('/profile', isLoggedIn, profilePage)

// Module Export to ServerFile
module.exports = { app }
