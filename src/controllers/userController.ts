import ah from "express-async-handler";
import User from "../models/userModels";
import authService from "../services/authService";

const AuthService = new authService();
const authUser = ah(async (req, res) => {
  const data = await AuthService.signUp();
  res.status(200).json({data});
});

const registerUser = ah(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "register User" });
});

const logoutUser = ah(async (req, res) => {
  res.status(200).json({ message: "logout User" });
});

const getUserProfile = ah(async (req, res) => {
  res.status(200).json({ message: "Get User" });
});

const updateUserProfile = ah(async (req, res) => {
  res.status(200).json({ message: "update User" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
