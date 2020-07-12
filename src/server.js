const http = require('http')
const { app } = require('./app')
// const { connect } = require('./config/database')

const PORT = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(PORT, () => {
	console.log(`Running http://localhost:${PORT}`)
})
