const serialize = (user, done) => {
	done(null, user.id)
}

const deserialize = (object, done) => {
	done(null, object)
}

module.exports = { serialize, deserialize }
