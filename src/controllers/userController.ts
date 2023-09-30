import ah from 'express-async-handler';
import User from '../models/userModels';
import authService from '../services/authService';
import logger from '/';

const AuthService = new authService ()

const loginUser = ah(async(req, res) => {
    logger.info(req.body)
  res.status(200).json({ message: "login User" });
});


const registerUser = ah(async(req, res) => {
    console.log(req.body)
  res.status(200).json({ message: "register User" });
});


const logoutUser = ah(async(req, res) => {
  res.status(200).json({ message: "logout User" });
});


const getUserProfile = ah(async(req, res) => {
  res.status(200).json({ message: "Get User" });
});

const updateUserProfile = ah(async(req, res) => {
    res.status(200).json({ message: "update User" });
  });


export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
