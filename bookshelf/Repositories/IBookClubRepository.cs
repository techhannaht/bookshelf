using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IBookClubRepository
    {
        List<BookClub> GetAllBookClubsByUser(int id);
    }
}