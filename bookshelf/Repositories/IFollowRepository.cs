using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IFollowRepository
    {
        void Add(Follow follow);
        void Delete(int userId, int friendId);
        List<Follow> GetAll();
        List<Follow> GetFollowsByLoggedInUserId(int id);
    }
}