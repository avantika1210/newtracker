const router = require('express').Router(); // ✅ correct
const { signupValidation, loginValidation} = require('../Middlewares/AuthValidation');
const { signup,login} = require('../Controllers/AuthController');

router.post('/signup', signupValidation, signup); 
router.post('/login', loginValidation, login); 

module.exports = router;