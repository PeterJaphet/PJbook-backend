import mongoose, { Schema, models } from 'mongoose';

import { ROLES } from '../utils/enums';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ROLES,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
