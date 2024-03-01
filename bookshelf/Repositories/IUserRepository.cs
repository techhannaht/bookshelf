using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IUserRepository
    {
        void Add(User userProfile);
        List<User> GetAll();
        User GetById(int id);
        User GetByUserName(string userName);
        List<User> Search(string criterion);
    }
}