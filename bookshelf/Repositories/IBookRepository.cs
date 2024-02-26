using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IBookRepository
    {
        List<Book> GetAllBooksByUser(int id);
    }
}