const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth.js');
const validate = require('../middlewares/validate.js');
const {registerSchema, loginSchema} = require('../validators/auth.validation.js');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
