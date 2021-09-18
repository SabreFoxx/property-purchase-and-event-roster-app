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

const methodNotAllowed = (req, res) => {
    res.status(405)
        .json({ message: 'This HTTP method is currently not allowed on this route' });
}

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
    .post(auth, addCohost)
    .all(methodNotAllowed);

router.route('/guest')
    .post(auth, inviteGuest)
    .all(methodNotAllowed);

router.route('/pin')
    .post(submitPin)
    .all(methodNotAllowed);

router.route('/verify-otp')
    .post(auth, verifyOTP)
    .all(methodNotAllowed);

router.route('/user')
    .put(auth, updateDetails)
    .post(submitDetails)
    .all(methodNotAllowed);

export default router;
