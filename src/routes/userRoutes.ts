import {
  registerUserHandler,
  signInUserAuth,
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
import { auth } from '../middleware/auth';
import { callbackHandler } from '../utils/callbackController';

import express from 'express';

const router = express.Router();

router.post('/', registerUserHandler);
router.post('/login', signInUserAuth);

router.get('/forgot-password', forgtPasswordInputPageHandler);
router.post('/forgot-password-processor', forgotPasswordHandler);
router.post('/reset-password-processor', resetPasswordHandler);
router.patch('/update-profile-picture', auth, updateUserProfilePicture);
router.patch('/update-user-profile', auth, updateUserProfile);

router.post('/getuser', auth, getUser);

router.post('/changepassword', changePassword);
router.post('/send-otp', sendOTP);
router.post('/confirm-otp', confirmOTP);
router.post('/resend-otp', resendOTP);

router.get('/googlelogin', googleAuthUser);
router.get('/auth/google/callback', callbackHandler);
router.get('/googlehtmlpage', googleHtmlPage);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.get('/', pjbooksWelcomePage);

export default router;
