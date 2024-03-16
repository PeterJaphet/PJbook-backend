import express from 'express';
import {
  addBook,
  // getBook, getBooks, latestBook, recommendedBook, trendingBook, updateBook
} from '../controllers/bookController';
import { upload } from '../utils/aws';

const router = express.Router();

router.post('/add-book', upload.single('fileUploadUrl'), addBook);
// router.get('/get-books' , getBooks);
// router.get('/get-book/:id' , getBook);
// router.patch('/update-book/:id' , updateBook);
// router.get('/recommended-books' , recommendedBook);
// router.get('/trending-books' , trendingBook);
// router.get('/latest-books' , latestBook);

export default router;
