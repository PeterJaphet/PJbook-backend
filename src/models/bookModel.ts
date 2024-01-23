import mongoose, { Schema, models } from "mongoose";

import { BOOKTYPE } from "../utils/enums";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    fileUploadUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userLikes: [
      {
        type: String,
        default: "",
      },
    ],
    userSaves: [
      {
        type: String,
        default: "",
      },
    ],
    genre: [
      {
        type: String,
        default: "",
      },
    ],
    type: {
      type: String,
      required: true,
      enum: BOOKTYPE,
      default: BOOKTYPE.PUBLIC,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Book = models.Book || mongoose.model("Book", bookSchema);

export default Book;
