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
  forgotPasswordHandler,
  forgtPasswordInputPageHandler,
  resetPasswordHandler,
  updateUserProfilePicture,
} from '../controllers/userController';
import { callbackHandler } from '../utils/callbackController';

import express from 'express';

const router = express.Router();

router.get('/forgot-password', forgtPasswordInputPageHandler);
router.post('/forgot-password-processor', forgotPasswordHandler);
router.post('/reset-password-processor', resetPasswordHandler);
router.post('/update-profile-picture', updateUserProfilePicture);
router.post('/update-user-profile', updateUserProfile);

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
