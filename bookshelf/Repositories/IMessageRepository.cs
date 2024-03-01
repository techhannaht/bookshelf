using bookshelf.Models;

namespace bookshelf.Repositories
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(int id);
        List<Message> GetAllMessagesByBookClub(int id);
    }
}