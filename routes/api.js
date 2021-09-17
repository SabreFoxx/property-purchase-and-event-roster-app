import express from 'express'
import env from 'dotenv';
import expressJwt from 'express-jwt';

const router = express.Router();
env.config();

// authentication middleware that helps us decode our jwt token and saves it in express' req object
const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    // we'll put this property "payload" containing our decrypted jwt, inside express' req object
    userProperty: 'payload',
    algorithms: ['HS256']
    // if we didn't supply a valid token, control flow continues at the bottom error handler in app.js
});

import { register, login } from '../controllers/auth.js';
import {
    addCohost,
    inviteGuest,
    submitPin,
    updateDetails,
    submitDetails,
    verifyOTP
} from '../controllers/user.js';

router.post('/register', register);
router.post('/login', login);

router.route('/cohost')
    .post(auth, addCohost);

router.route('/guest')
    .post(auth, inviteGuest);

router.route('/pin')
    .post(submitPin);

router.route('/verify-otp')
    .post(auth, verifyOTP);

router.route('/user')
    .put(auth, updateDetails)
    .post(submitDetails);

export default router;
