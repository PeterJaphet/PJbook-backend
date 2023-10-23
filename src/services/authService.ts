import { ValidationError } from "../middleware/errorMiddleware";
import User from "../models/userModels";
import Otp from "../models/userOtpVerification";
import AuthRepo from "../repo/authRepo";
import otpGenerator from "otp-generator";
import { otpType, userSignUp } from "../types/auth";
import { bcryptPassword } from "../utils/hashPassword";
import { generateJwt } from "../utils/jwtLib";

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
    if (existingUser) {
      throw new ValidationError("user with this email already exists");
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);
    
    return otp;
  }

  async login() {}
}

export default authService;
