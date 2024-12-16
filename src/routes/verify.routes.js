import express from 'express';
import { verifyOtp  } from '../controllers/user.controller.js';

const router = express.Router();

// router.post('/send-otp', sendOTP);

router.post('/verify-otp', verifyOtp );

export default router;
