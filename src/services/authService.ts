
import { ValidationError } from "../middleware/errorMiddleware";
import AuthRepo from "../repo/authRepo";
import { generateJwt } from "../utils/jwtLib";
import mongoose from "mongoose";
import logger from "../utils/logger";
import { generateOTP } from '../utils/generateOTP';
import { ValidationError } from '../middleware/errorMiddleware';
import User from '../models/userModels';
import Otp from '../models/userOtpVerification';

import otpGenerator from 'otp-generator';
import {
  confirmOtpType,
  otpType,
  userSignUp,
  userLogin,
  GoogleUserResult,
} from '../types/auth';
import { bcryptCompare, bcryptPassword } from '../utils/hashPassword';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import qs from 'qs';
import axios from 'axios';
import { GoogleTokensResult } from '../types/auth';

class authService {
  async signIn(currentUser: userLogin) {
    const existingUser = await User.findOne({ email: currentUser.email });

    if (existingUser) {
      const passMatch = await bcryptCompare(
        currentUser.password,
        existingUser.password
      );
      if (!passMatch) {
        throw new ValidationError(`Wrong password. Plase check and try again`);
      }
    } else {
      throw new ValidationError('Wrong Email, please check and try again');
    }

    const token = generateJwt(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      false
    );

    return { existingUser, token };
  }

  async getGoogleOAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
      redirect_uri: process.env.REDIRECT_URL as string,
      client_id: process.env.CLIENT_ID as string,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  }

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
      throw new ValidationError('user with this email already exists');
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

  async getGoogleOAuthTokens({
    code,
  }: {
    code: string;
  }): Promise<GoogleTokensResult> {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      grant_type: 'authorization_code',
    };

    try {
      const res = await axios.post<GoogleTokensResult>(
        url,
        qs.stringify(values),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getGoogleUser(
    id_token: string,
    access_token: string
  ): Promise<GoogleUserResult> {
    try {
      const res = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findAndUpdateUser(
    query: FilterQuery<any>,
    update: UpdateQuery<any>,
    options: QueryOptions = {}
  ) {
    return User.findOneAndUpdate(query, update, options);
    }
}

export default authService;
