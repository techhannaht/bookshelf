using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IBookClubRepository
    {
        void AddBookClub(BookClub bookClub);
        void DeleteBookClub(int bookClubId);
        List<BookClub> GetAllBookClubsByUser(int id);
    }
}