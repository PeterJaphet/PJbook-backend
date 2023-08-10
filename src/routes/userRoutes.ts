import { authUser, registerUser, logoutUser, updateUserProfile, getUserProfile } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;
