using System.ComponentModel.DataAnnotations;

namespace bookshelf.Models
{
    public class Book
    {
        public int id { get; set; }

        public int userId { get; set; }

        public User? User { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public int totalPage { get; set; }

        [Required]
        public string genre { get; set; }

        [Required]
        public string author { get; set; }

    }
}
