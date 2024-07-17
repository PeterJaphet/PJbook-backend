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

router.post('/login', signInUserAuth); //done
router.post('/sign-up', registerUserHandler); //done
router.post('/change-password', changePassword); //done

router.patch('/update-profile-picture', auth(), updateUserProfilePicture); //done

router.patch('/update-user-profile', auth(), updateUserProfile); // done

router.post('/get-user', auth(), getUser); //done
router.post('/logout', auth(), logoutUser); //done

// router.route('/profile').get(getUserProfile).put(updateUserProfile); //in compare
//THESAME AS ABOVE

router.get('/forgot-password', forgtPasswordInputPageHandler);
router.post('/forgot-password-processor', forgotPasswordHandler);
router.post('/reset-password-processor', resetPasswordHandler);

router.post('/send-otp', sendOTP); //done
router.post('/confirm-otp', confirmOTP); //done
router.post('/resend-otp', resendOTP); //done

router.get('/googlelogin', googleAuthUser);
router.get('/auth/google/callback', callbackHandler);
router.get('/googlehtmlpage', googleHtmlPage);

router.get('/', pjbooksWelcomePage); //done

export default router;
