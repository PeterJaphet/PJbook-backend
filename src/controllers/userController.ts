import ah from 'express-async-handler';
import { Request, Response } from 'express';
import path from 'path';

import { ForgotPasswordSchemaInput, forgotPasswordSchema } from '../types/auth';

import authService from '../services/authService';
import { CustomRequest } from '../utils/requestInterface';

const AuthService = new authService();

const registerUserHandler = ah(async (req, res) => {
  const data = await AuthService.signUp(req.body);
  res.status(200).json({ data });
});

const forgtPasswordInputPageHandler = ah(async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/forgotPasswordInputPage.html'));
});

const forgotPasswordHandler = ah(
  async (req: Request<{}, {}, ForgotPasswordSchemaInput>, res: Response) => {
    const { email, admin } = forgotPasswordSchema.parse(req.body);

    await AuthService.forgotPassword({ email, admin });

    res.json({ message: 'Password reset email sent' });
  }
);

const resetPasswordHandler = ah(async (req, res) => {
  await AuthService.resetForgotPassword(req.body);

  res.status(200).redirect('http://localhost:5000/users/login');
});

const updateUserProfile = ah(async (req, res) => {
  console.log(req);

  const data = await AuthService.updateUserProfile(
    req.body,
    req.body.tokenData
  );
  res
    .status(200)
    .json({ success: true, message: 'User updated Successfully', data });
});

const updateUserProfilePicture = ah(async (req, res) => {
  const data = await AuthService.updateUserProfilePicture(req.body);
  res.status(200).json({
    success: true,
    message: 'User Profile Picture updated Successfully',
    data,
  });
});

const getUser = ah(async (req: CustomRequest, res) => {
  const data = await AuthService.getUser(req.tokenData?.email!);
  res.status(200).json({ data });
});

const changePassword = ah(async (req, res) => {
  const data = await AuthService.changePassword(req.body);
  res.status(200).json({ data });
});

const signInUserAuth = ah(async (req, res) => {
  const data = await AuthService.signIn(req.body);
  res.cookie('token', data.token, {
    httpOnly: true,
    //secure:true,
    //maxAge:true,
    //signed:true,
  });
  //res.redirect('/dashboardPage')
  res.status(200).json({ data });
});

const googleAuthUser = ah(async (req, res) => {
  const data = await AuthService.getGoogleOAuthURL();
  res.redirect(data);
});

const googleHtmlPage = ah(async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

const sendOTP = ah(async (req, res) => {
  const data = await AuthService.sendOTP(req.body);
  res
    .status(200)
    .json({ success: true, message: 'OTP sent successfully', data });
});

const confirmOTP = ah(async (req, res) => {
  const data = await AuthService.confirmOTP(req.body);
  res.status(200).json({ success: true, data });
});

const resendOTP = ah(async (req, res) => {
  const data = await AuthService.resendOTP(req.body);
  res
    .status(200)
    .json({ success: true, message: 'OTP sent successfully', data });
});

const logoutUser = ah(async (req, res) => {
  res.status(200).json({ message: 'logout User' });
});

const getUserProfile = ah(async (req, res) => {
  const data = await AuthService.getUser(req.body);
  res.status(200).json({ data });
});

const pjbooksWelcomePage = ah(async (req, res) => {
  res.send('Welcome to PJ Books Backend!');
});

export {
  registerUserHandler,
  signInUserAuth,
  googleAuthUser,
  sendOTP,
  confirmOTP,
  resendOTP,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  pjbooksWelcomePage,
  googleHtmlPage,
  changePassword,
  getUser,
  updateUserProfilePicture,
  forgotPasswordHandler,
  forgtPasswordInputPageHandler,
  resetPasswordHandler,
};
