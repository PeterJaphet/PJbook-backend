import { ValidationError } from "../middleware/errorMiddleware";
import User from "../models/userModels";
import Otp from "../models/userOtpVerification";
import AuthRepo from "../repo/authRepo";
import { confirmOtpType, otpType, userSignUp } from "../types/auth";
import { bcryptPassword } from "../utils/hashPassword";
import { generateJwt } from "../utils/jwtLib";
import mongoose from "mongoose";
import logger from "../utils/logger";
import { generateOTP } from '../utils/generateOTP';

class authService {
  async signUp(newUser: userSignUp) {
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser)
      throw new ValidationError(`${existingUser.role} already Exists!`);
    newUser.password = await bcryptPassword(newUser.password);

    const user = await User.create({ ...newUser, isActive: true });

    const token = generateJwt(
      { id: user.id, email: user.email, role: user.role },
      false
    );
    return { user, token };
  }

  async sendOTP(otpInfo: otpType) {
    const { email } = otpInfo;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ValidationError("user with this email already exists");
    }
    const otp = await generateOTP()
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);

    return otp;
  }

  async confirmOTP(confirmOtp: confirmOtpType) {
    const { email, otp } = confirmOtp;

    console.log(email,"Hello", otp)
    const user = await User.findOne({ email });

    if (!user) {
      throw new ValidationError("User with this email does not exists");
    }

    console.log(user)
    let _otp = await Otp.findOne({ otp: otp });
    if (!_otp) {
      throw new ValidationError("Invalid OTP");
    }
    const result = await User.findByIdAndUpdate(
      { _id: user._id },
      { isActive: true, verified: true }
    );
    const token = generateJwt(
      { id: user.id, email: user.email, role: user.role },
      false
    );
    return { user, token };
  }

  async resendOTP(otpInfo: otpType) {
    const { email } = otpInfo;
    const user = await User.findOne({ email });

    if (!user) {
      throw new ValidationError("User with this email does not exists");
    }
    const otp = await generateOTP()
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);
    return otp;
  }
}

export default authService;
