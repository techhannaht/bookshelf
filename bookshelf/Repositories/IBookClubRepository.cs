using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IBookClubRepository
    {
        void AddBookClub(BookClub bookClub);
        void DeleteBookClub(int bookClubId);
        void EditBookClub(BookClub bookClub);
        List<BookClub> GetAllBookClubsByUser(int id);
    }
}