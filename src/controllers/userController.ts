import ah from 'express-async-handler';
import path from 'path';

import authService from '../services/authService';

const AuthService = new authService();

const getUser = ah(async (req, res) => {
  console.log(req.body);
  const data = await AuthService.getUser(req.body);
  res.status(200).json({ data });
});

const changePassword = ah(async (req, res) => {
  console.log(req.body);
  const data = await AuthService.changePassword(req.body);
  res.status(200).json({ data });
});

const authUser = ah(async (req, res) => {
  console.log(req.body);
  const data = await AuthService.signIn(req.body);
  res.status(200).json({ data });
});

const googleAuthUser = ah(async (req, res) => {
  const data = await AuthService.getGoogleOAuthURL();
  res.redirect(data);
});

const googleHtmlPage = ah(async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

const registerUser = ah(async (req, res) => {
  const data = await AuthService.signUp(req.body);
  res.status(200).json({ data });
});

const sendOTP = ah(async (req, res) => {
  const data = await AuthService.sendOTP(req.body);
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
  // res.status(200).json({ message: 'Get User' });
});

const updateUserProfile = ah(async (req, res) => {
  const data = await AuthService.updateUser(req.body);
  res
    .status(200)
    .json({ success: true, message: 'User updated Successfully', data });
});

const pjbooksWelcomePage = ah(async (req, res) => {
  res.send('Welcome to PJ Books Backend!');
});

export {
  authUser,
  googleAuthUser,
  registerUser,
  sendOTP,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  pjbooksWelcomePage,
  googleHtmlPage,
  changePassword,
  getUser,
};
