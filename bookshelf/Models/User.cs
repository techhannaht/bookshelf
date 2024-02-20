using System.ComponentModel.DataAnnotations;

namespace bookshelf.Models
{
    public class User
    {
        public int id { get; set; }

        [Required]
        [MaxLength(50)]
        public string firstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string lastName { get; set; }

        [Required]
        [MaxLength(50)]
        public required string userName { get; set; }

        [Required]
        [MaxLength(50)]
        public string password { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string imageUrl { get; set; }

        public string FullName
        {
            get
            {
                return $"{firstName} {lastName}";
            }
        }

    }
}
