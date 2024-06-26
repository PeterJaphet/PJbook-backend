import fs from 'fs';
import { ValidationError } from '../middleware/errorMiddleware';
import AuthRepo from '../repo/authRepo';
import { generateJwt } from '../utils/jwtLib';
import mongoose from 'mongoose';
import logger from '../utils/logger';
import { generateOTP } from '../utils/generateOTP';

import User from '../models/userModels';
import Otp from '../models/userOtpVerification';

import otpGenerator from 'otp-generator';
import {
  confirmOtpType,
  otpType,
  userSignUp,
  userLogin,
  GoogleUserResult,
  userChangePassword,
  // IUser,
  updatedUser,
  getUser,
  mailOptionsSchema,
  ForgotPasswordSchemaInput,
  userResetForgotPasswordInput,
  updatedProfilePicture,
} from '../types/auth';
import { bcryptCompare, bcryptPassword } from '../utils/hashPassword';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import qs from 'qs';
import axios from 'axios';
import crypto from 'crypto';
import { z } from 'zod';
import { GoogleTokensResult } from '../types/auth';
import { uploadCloudImage } from '../utils/cloudinary';
import mailSender from '../utils/mailSender';
import path from 'path';

class authService {
  async forgotPassword(userDetails: ForgotPasswordSchemaInput) {
    const { email, admin } = userDetails;

    const message =
      'If your email exists in our records, you will recieve a password reset email';

    const title = 'Reset Password Email Alert';

    const body = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div>
    <h2>Reset Password</h2>
    <br>
    <p>Kindly type in your New Password and Confirm Password below:</p>

    <form action="http://localhost:5000/users/reset-password-processor" method="POST">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <br>


      <label for="newpassword">New Password:</label>
      <input type="password" id="newpassword" name="newpassword" required>

      <br>

      <label for="confirmpassword">Confirm Password:</label>
      <input type="password" id="confirmpassword" name="confirmpassword" required>

      <br>

      <button type="submit">Reset Password</button>
    </form>
  </div>
</body>

</html>`;

    const user = await User.findOne({ email: email });

    if (!user) {
      logger.debug(`User with email: ${email} does not exist`);
      throw new ValidationError(`User not found! ${message}`);
    }
    if (!user.verified) {
      logger.err(`User is not verified.....logger.err says`);
      throw new ValidationError('User is not verified');
    }
    await mailSender(email, title, body);
    return;
  }

  async resetForgotPassword(userDetails: userResetForgotPasswordInput) {
    const { email, newPassword, confirmPassword } = userDetails;
    const newPasswordhash = await bcryptPassword(newPassword);

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) throw new ValidationError(`${email} does not exist!`);

    const updatedUser = await User.updateOne(
      { email: email },
      { $set: { password: newPasswordhash } }
    );

    return updatedUser;
  }

  async updateProfilePicture(image: any) {
    const result = await uploadCloudImage(image, null);

    const newCloudinaryImageUrl = result.secure_url;
  }

  async resetPassword(userDetails: userChangePassword) {
    const { email, oldPassword, newPassword } = userDetails;
    const newPasswordhash = await bcryptPassword(newPassword);

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) throw new ValidationError(`${email} does not exist!`);

    const passwordMatch = await bcryptCompare(
      oldPassword,
      existingUser.password
    );

    if (!passwordMatch) {
      throw new ValidationError(`old Password does not exist!`);
    }

    const updatedUser = await User.updateOne(
      { email: email },
      { $set: { password: newPasswordhash } }
    );

    return updatedUser;
  }

  async getUser(userEmail: getUser) {
    const existingUser = await User.findOne({ email: userEmail.email });
    return existingUser;
  }

  async changePassword(userDetails: userChangePassword) {
    const { email, oldPassword, newPassword } = userDetails;
    const newPasswordhash = await bcryptPassword(newPassword);

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) throw new ValidationError(`${email} does not exist!`);

    const passwordMatch = await bcryptCompare(
      oldPassword,
      existingUser.password
    );

    if (!passwordMatch) {
      throw new ValidationError(`old Password does not exist!`);
    }

    const updatedUser = await User.updateOne(
      { email: email },
      { $set: { password: newPasswordhash } }
    );

    return updatedUser;
  }

  async updateUserProfile(userUpdateProfile: updatedUser) {
    const {
      email,
      firstName,
      lastName,
      dob,
      role,
      phoneNumber,
      verified,
      isActive,
      address,
    } = userUpdateProfile;
    const updatedUser = await User.updateOne(
      { email: email },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          role: role,
          phoneNumber: phoneNumber,
          verified: verified,
          isActive: isActive,
          address: address,
        },
      }
    );

    return updatedUser;
  }

  async updateUserProfilePicture(userPictureProfile: updatedProfilePicture) {
    const { email, avatar } = userPictureProfile;
    const updatedPictureAvatar = await User.updateOne(
      { email: email },
      { $set: { avatar: avatar } }
    );
    return updatedPictureAvatar;
  }

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

    console.log(user);

    const token = generateJwt(
      { id: user.id, email: user.email, role: user.role },
      false
    );
    console.log(`${token}`);

    return { user, token };
  }

  async sendOTP(otpInfo: otpType) {
    const { email } = otpInfo;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ValidationError('user with this email already exists');
    }
    const otp = await generateOTP();
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);

    return otp;
  }

  async confirmOTP(confirmOtp: confirmOtpType) {
    const { email, otp } = confirmOtp;

    console.log(email, 'Hello', otp);
    const user = await User.findOne({ email });

    if (!user) {
      throw new ValidationError('User with this email does not exists');
    }
    let _otp = await Otp.findOne({ otp: otp });
    if (!_otp) {
      throw new ValidationError('Invalid OTP');
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
      throw new ValidationError('User with this email does not exists');
    }
    const otp = await generateOTP();
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
