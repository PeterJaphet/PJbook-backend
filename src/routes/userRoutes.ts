import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  sendOTP,
  confirmOTP,
  resendOTP,
  pjbooksWelcomePage,
  googleAuthUser,
  googleHtmlPage,
  changePassword,
  getUser,
} from '../controllers/userController';
import express from 'express';
import { callbackHandler } from '../utils/callbackController';

const router = express.Router();
router.post('/getuser', getUser);

router.post('/', registerUser);

router.post('/changepassword', changePassword);

router.post('/send-otp', sendOTP);
router.post('/confirm-otp', confirmOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', authUser);

router.get('/googlelogin', googleAuthUser);
router.get('/auth/google/callback', callbackHandler);

router.get('/googlehtmlpage', googleHtmlPage);

router.post('/logout', logoutUser);

router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.get('/', pjbooksWelcomePage);

export default router;
