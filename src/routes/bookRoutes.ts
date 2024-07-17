import express from 'express';
import {
  addBook,
  getBook,
  getBooks,
  getTotalBooksCount,
  latestBooks,
  recommendedBooks,
  trendingBooks,
  updateBook,
} from '../controllers/bookController';
import { upload } from '../utils/aws';

const router = express.Router();

router.post('/add-book', upload.single('fileUploadUrl'), addBook);
router.get('/get-books', getBooks); //done
router.get('/get-book/:id', getBook); //done
router.patch('/update-book/:id', updateBook); //done
router.get('/recommended-books', recommendedBooks);
router.get('/trending-books', trendingBooks);
router.get('/latest-books', latestBooks);

router.get('/total-books-count', getTotalBooksCount);

export default router;
