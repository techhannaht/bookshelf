using System.ComponentModel.DataAnnotations;

namespace bookshelf.Models
{
    public class Book
    {
        public int id { get; set; }

        public int userId { get; set; }

        public User? User { get; set; }

        [Required]
        [MaxLength(50)]
        public string title { get; set; }

        [Required]
        [MaxLength(50)]
        public int currentPage { get; set; }

        [Required]
        [MaxLength(50)]
        public required int totalPage { get; set; }

        [Required]
        [MaxLength(50)]
        public int genreId { get; set; }

        public Genre? Genre { get; set; }

        [Required]
        [MaxLength(255)]
        public int authorId { get; set; }

        public Author? Author { get; set; }

    }
}
