import mongoose, { Schema, models } from "mongoose";
import mailSender from "../utils/mailSender";
import logger from "../utils/logger";

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email: string, otp: number) {
  try {
    const mailResponse = await mailSender(
      email,
      "PJ Books Verification Email",
      `<h1>PJ BOOKS</h1>
      <h2>Please confirm your OTP</h2>
       <p>Here is your OTP code: <b>${otp}</b>. Expires in 5 minutes.</p>`
    );
    logger.info("Email sent successfully: ", mailResponse);
  } catch (error) {
    logger.info("Error occurred while sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  logger.info("New document saved to the database");
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const Otp = models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;
