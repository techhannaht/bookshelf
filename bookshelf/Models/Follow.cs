namespace bookshelf.Models
{
    public class Follow
    {
        public int id { get; set; }
        public int userId { get; set; }
        public int friendId { get; set; }
        public User? User { get; set; }
    }
}
