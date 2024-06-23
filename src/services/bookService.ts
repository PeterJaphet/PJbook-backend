import { ValidationError } from '../middleware/errorMiddleware';
import Book from '../models/bookModel';
import User from '../models/userModels';
import BookRepo from '../repo/bookRepo';
import {
  addBookType,
  getBookInputType,
  getBooksType,
  updateBookType,
} from '../types/book';
import { uploadFileToAws } from '../utils/aws';
import { uploadCloudImage, uploadPdfFile } from '../utils/cloudinary';
import { bookGenre } from '../utils/constants';

class bookService {
  async addBook(bookData: addBookType, file: any) {
    const cloudImg = await uploadCloudImage(bookData.imageUrl, 'BookCover');
    bookData.imageUrl = cloudImg.url;

    for (let genre of bookData.genre) {
      if (!bookGenre.includes(genre))
        throw new ValidationError('Inavlid Genre!');
    }

    bookData.fileUploadUrl = await uploadFileToAws(file);

    const book = await BookRepo.add(bookData);
    return book;
  }

  async getBooks() {
    const bookList: getBooksType = await Book.find();

    return bookList;
  }

  async getBook(parameters: getBookInputType) {
    const { id } = parameters;
    const book = await Book.findOne({ _id: id });
    return book;
  }

  async updateBook(
    parameters: getBookInputType,
    updateParameters: updateBookType
  ) {
    const { id } = parameters;
    const { title, description, imageUrl, fileUploadUrl, genre, type } =
      updateParameters;

    const updatedBook = await Book.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          fileUploadUrl: fileUploadUrl,
          genre: genre,
          type: type,
        },
      }
    );

    return updatedBook;
  }
}

export default bookService;
