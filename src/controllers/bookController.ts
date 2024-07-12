import bookService from "../services/bookService";
import ah from "express-async-handler";
import { upload } from "../utils/aws";
import { ValidationError } from "../middleware/errorMiddleware";

const BookService = new bookService();

const addBook = ah(async (req, res) => {
  if (!req.files) throw new ValidationError("File is empty!");
  const data = await BookService.addBook(req.body, req.files);
  res.status(200).json({ data });
});

// const getBooks = ah(async (req, res) => {
//   const data = await BookService.addBook(req.body);
//   res.status(200).json({ data });
// });

// const getBook = ah(async (req, res) => {
//   const data = await BookService.addBook(req.body);
//   res.status(200).json({ data });
// });

// const updateBook = ah(async (req, res) => {
//   const data = await BookService.addBook(req.body);
//   res.status(200).json({ data });
// });

// const recommendedBook = ah(async (req, res) => {
//   const data = await BookService.addBook(req.body);
//   res.status(200).json({ data });
// });

// const trendingBook = ah(async (req, res) => {
//   const data = await BookService.addBook(req.body);
//   res.status(200).json({ data });
// });

// const latestBook = ah(async (req, res) => {
//   const data = await BookService.addBook(req.body);
//   res.status(200).json({ data });
// });

export {
  addBook,
  // getBooks,
  // getBook,
  // updateBook,
  // recommendedBook,
  // trendingBook,
  // latestBook,
};
