import { authUser, registerUser, logoutUser, updateUserProfile, getUserProfile, sendOTP } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post('/', registerUser);
router.post('/send-otp', sendOTP);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;
