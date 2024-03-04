using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IBookRepository
    {
        void Add(Book book);
        void DeleteBook(int bookId);
        void EditBook(Book book);
        List<Book> GetAllBooks();
        //List<Book> GetAllBooksByUser(int id);
        void AddBookClub(BookClub bookClub);

    }
}