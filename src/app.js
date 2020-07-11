require('dotenv').config()

const app = require('express')()
const db  = require('./config/database')
const { addCustomer, findCustomer } = require('./controllers/Authentication')

db.connect()
app.post('/login', addCustomer)
app.get('/profile', findCustomer)

module.exports = { app }
