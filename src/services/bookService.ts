import { ValidationError } from "../middleware/errorMiddleware";
import User from "../models/userModels";
import BookRepo from "../repo/bookRepo";
import { addBookType } from "../types/book";
import { uploadFileToAws } from "../utils/aws";
import { uploadCloudImage, uploadPdfFile } from "../utils/cloudinary";
import { bookGenre } from "../utils/constants";

class bookService {
  async addBook(bookData: addBookType , file: any) {
    const cloudImg = await uploadCloudImage(bookData.imageUrl, "BookCover");
    bookData.imageUrl = cloudImg.url;

    for (let genre of bookData.genre){
        if(!bookGenre.includes(genre))
        throw new ValidationError("Inavlid Genre!");
    }

    bookData.fileUploadUrl = await uploadFileToAws(file);

    const book = await BookRepo.add(bookData);
    return book;
  }
}

export default bookService;
