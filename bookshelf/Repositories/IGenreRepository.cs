using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IGenreRepository
    {
        List<Genre> GetAll();
    }
}