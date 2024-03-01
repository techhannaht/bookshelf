namespace bookshelf.Models
{
    public class Message
    {
        public int id { get; set; }

        public int userId { get; set; }

        public int bookClubId { get; set; }

        public string content { get; set; }

        public DateTime sendDateTime { get; set; }
        public User? User { get; set; }

    }
}
