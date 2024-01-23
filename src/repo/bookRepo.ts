import Book from "../models/bookModel";

class BookRepo {
    static async add(data: any) {
        const book = new Book(data);
        await book.save();
        return book;
      }
    
      static async update(query: any, data: typeof Book) {
        return Book.findOneAndUpdate(query, data, { new: true });
      }
    
      static async find(query: any) {
        return Book.findOne(query, { __v: 0, password: 0 });
      }
      static async findWithP(query: any) {
        return Book.findOne(query);
      }
    
      static async findSeveralBooks(query: any) {
        return Book.find(query);
      }
    
      static async deleteBook(query: any) {
        return Book.deleteOne(query);
      }
    
      static async getActiveBooks(page: number, pageSize: number) {
        return Book.find({}, { __v: 0, password: 0 })
          .sort({ _id: -1 })
          .skip(page)
          .limit(pageSize);
      }
 
 
 }
 
 export default BookRepo