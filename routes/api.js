import express from 'express';
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
    verifyOTP,
    getUserSeat,
    setUserSeat,
    paymentHistory as userPaymentHistory,
    successfulPayments as paymentNotification
} from '../controllers/user.js';
import {
    fetchDashboard,
    setEventCountdown,
    paymentLog
} from '../controllers/dashboard.js';
import {
    addSpeaker,
    fetchSpeaker,
    addAgenda,
    fetchAgenda,
    fetchAgendas,
    updateAgenda,
    addSpeakerToAgenda,
    setMainSpeaker
} from '../controllers/activity.js';
import {
    fetchProperty,
    addProperty,
    addPropertyCategory,
    initiatePayment,
    uploadPaymentDocument,
    verifyPayment,
    verifyOfflinePayment,
    paystackWebhook
} from '../controllers/property.js';

router.post('/register', register);
router.post('/login', login);

router.route('/admin/event-countdown')
    .put(auth, setEventCountdown)
    .all(methodNotAllowed);
router.route('/admin/payment')
    .get(auth, paymentLog)
    .all(methodNotAllowed);
router.route('/admin/payment/verify-offline')
    .post(auth, verifyOfflinePayment)
    .all(methodNotAllowed);

router.route('/cohost')
    .post(auth, addCohost)
    .put(auth, inviteGuest)
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
router.route('/user/seat')
    .get(auth, getUserSeat)
    .put(auth, setUserSeat)
    .all(methodNotAllowed);
router.route('/user/payment')
    .get(auth, userPaymentHistory)
    .all(methodNotAllowed);
router.route('/user/payment/notification')
    .get(auth, paymentNotification)
    .all(methodNotAllowed);
router.route('/user/document')
    .post(auth, uploadPaymentDocument)
    .all(methodNotAllowed);

router.get('/dashboard', fetchDashboard);

router.route('/agenda')
    .get(fetchAgendas)
    .post(auth, addAgenda)
    .all(methodNotAllowed);
router.route('/agenda/:id')
    .get(fetchAgenda)
    .put(auth, updateAgenda)
    .all(methodNotAllowed);
router.route('/agenda/:id/add-speaker')
    .put(auth, addSpeakerToAgenda)
    .patch(auth, setMainSpeaker)
    .all(methodNotAllowed);

router.route('/speaker')
    .post(auth, addSpeaker);
router.route('/speaker/:id')
    .get(fetchSpeaker)
    .all(methodNotAllowed);

router.route('/property')
    .get(fetchProperty)
    .post(auth, addProperty)
    .all(methodNotAllowed);
router.route('/property/cat')
    .post(auth, addPropertyCategory)
    .all(methodNotAllowed);
router.post('/property/paystack-webhook', paystackWebhook);
router.route('/property/verify-payment')
    .post(auth, verifyPayment)
    .all(methodNotAllowed);
router.route('/property/:plotId')
    .get(auth, initiatePayment)
    .all(methodNotAllowed);

export default router;
