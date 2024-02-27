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
        public int currentPage { get; set; }

        [Required]
        public int totalPage { get; set; }

        [Required]
        public int genreId { get; set; }

        public Genre? Genre { get; set; }

        [Required]
        public int authorId { get; set; }

        public Author? Author { get; set; }

    }
}
