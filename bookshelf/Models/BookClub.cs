namespace bookshelf.Models
{
    public class BookClub
    {

        public int id { get; set; }
        public int userId { get; set; }
        public int bookId { get; set; }
        public int currentPage { get; set; }
        public User? User { get; set; }
        public Book? Book { get; set; }

    }
}
