import otpGenerator from "otp-generator";
import Otp from "../models/userOtpVerification";

export const generateOTP = async () => {
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

  return otp;
};
