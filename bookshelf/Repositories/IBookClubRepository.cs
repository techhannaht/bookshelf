using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IBookClubRepository
    {
        void AddBookClub(BookClub bookClub);
        List<BookClub> GetAllBookClubsByUser(int id);
    }
}