using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IAuthorRepository
    {
        List<Author> GetAll();
    }
}