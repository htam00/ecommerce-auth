const { Router } = require('express')
const {
	signinPage,
	signupPage,
	signinAuth,
	signupAuth,
	facebookAuth,
	facebookAuthCallback,
	googleAuth,
	googleAuthCallback,
	profilePage
} = require('./controllers/Authentication')

const { isLoggedIn } = require('./controllers/Authentication')

const router = new Router()

router.get('/signin', signinPage)
router.post('signin', signinAuth)

router.get('/signup', signupPage)
router.post('/signup', signupAuth)

router.get('/auth/facebook', facebookAuth)
router.get('/auth/facebook/callback', facebookAuthCallback)

router.get('/auth/google', googleAuth)
router.get('/auth/google/callback', googleAuthCallback)

router.get('/profile', isLoggedIn, profilePage)

module.exports = router
