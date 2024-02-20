using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetByUserName(string userName);
    }
}