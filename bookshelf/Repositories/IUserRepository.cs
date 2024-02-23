using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IUserRepository
    {
        void Add(User userProfile);
        List<User> GetAll();
        User GetByUserName(string userName);
    }
}