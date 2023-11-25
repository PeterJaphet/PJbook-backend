import { ValidationError } from "../middleware/errorMiddleware";
import { addBookType } from "../types/book";
import { uploadCloudImage } from "../utils/cloudinary";
import { bookGenre } from "../utils/constants";

class bookService {

    async addBook(bookData:addBookType){
        bookData.imageUrl = await uploadCloudImage(bookData.imageUrl, 'BookCover');
        const isGenreValid = bookGenre.every(value => bookData.genre.includes(value))
        if(!isGenreValid) 
        throw new ValidationError('Inavlid Genre!')

        
    }

}

export default bookService;