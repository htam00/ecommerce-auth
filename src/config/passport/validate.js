const bcrypt = require('bcrypt')

const generateHash = (password) => {
	return bcrypt.hashSync(
		password,
		bcrypt.genSaltSync(8),
		null
	)
}

const validPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password)
}

module.exports = {
	generateHash,
	validPassword
}
