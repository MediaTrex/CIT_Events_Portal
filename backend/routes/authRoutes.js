import express from 'express';
import { isAuthenticated, loginUser, logoutUser, registerUser, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js'

const authRouter = express.Router();

authRouter.get('/', (req,res) => {
    res.send("Auth Endpoint working . . . .");
})

authRouter.post('/signup',registerUser)
authRouter.post('/login',loginUser)
authRouter.post('/logout',logoutUser)
authRouter.post('/send-verify-otp', userAuth ,sendVerifyOtp)
authRouter.post('/verify-email', userAuth,verifyEmail)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/is-authenticated', userAuth, isAuthenticated)
authRouter.post('/reset-password',resetPassword)

export default authRouter;