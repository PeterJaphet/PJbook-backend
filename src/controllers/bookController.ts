import bookService from '../services/bookService';
import ah from 'express-async-handler';
import { upload } from '../utils/aws';
import { ValidationError } from '../middleware/errorMiddleware';
import { getBookInputType } from '../types/book';

const BookService = new bookService();

const addBook = ah(async (req, res) => {
  if (!req.file) throw new ValidationError('File is empty!');
  const data = await BookService.addBook(req.body, req.file);
  res.status(200).json({ data });
});

const getTotalBooksCount = ah(async (req, res) => {
  const data = await BookService.getTotalBooksCount();
  res.status(200).json({ data: data });
});

const getBooks = ah(async (req, res) => {
  const data = await BookService.getBooks();
  res.status(200).json({ data });
});

const getBook = ah(async (req, res) => {
  const id = req.params.id;
  const data = await BookService.getBook(id);
  res.status(200).json({ data });
});

const updateBook = ah(async (req, res) => {
  const { id } = req.params;
  const data = await BookService.updateBook(id, req.body);
  res.status(200).json({ data });
});

const recommendedBooks = ah(async (req, res) => {
  const data = await BookService.recommendedBooks();
  res.status(200).json({ data });
});

const trendingBooks = ah(async (req, res) => {
  const data = await BookService.trendingBooks();
  res.status(200).json({ data });
});

const latestBooks = ah(async (req, res) => {
  const data = await BookService.latestBooks();
  res.status(200).json({ data });
});

export {
  addBook,
  getBooks,
  getBook,
  updateBook,
  getTotalBooksCount,
  recommendedBooks,
  trendingBooks,
  latestBooks,
};
