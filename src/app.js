require('dotenv').config()

const path = require('path')

// Thirty-Party Module 
const app 	= require('express')()
const mongoose 	= require('mongoose')
const passport 	= require('passport')
const redis 	= require('redis')
const session 	= require('express-session')
const flash 	= require('connect-flash')
const helmet 	= require('helmet')

const RedisStore = require('connect-redis')(session)
const MongoStore = require('connect-mongo')(session)
const { urlencoded, json } = require('body-parser')
const cookieParser = require('cookie-parser')


// Import Module of Configure
const db = require('./config/database')
const pass = require('./config/passport/configure')

// Import Routers Authentication
const usersRouter = require('./routes')

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

/*
 * ------- Redis Session ---------
 */
const redisClient = redis.createClient()

// Configure
db.connect()
pass.configure()

// Middleware
app.set('trust proxy', 1)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(helmet())
app.use(cookieParser())
app.use(urlencoded({ extended: false }))
app.use(session({
	secret: process.env.SESSION_SECRET,
	secure: true,
	resave: false,
	saveUninitialized: true,
	store: new RedisStore({ client: redisClient })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Routes
app.use('/', usersRouter)

// Module Export to ServerFile
module.exports = { app }
