using bookshelf.Models;
using bookshelf.Utils;

namespace bookshelf.Repositories
{
    public class AuthorRepository : BaseRepository, IAuthorRepository
    {
        public AuthorRepository(IConfiguration configuration) : base(configuration) { }

        public List<Author> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, [name]
                        FROM Author
                       ";
                    var reader = cmd.ExecuteReader();
                    var authors = new List<Author>();
                    while (reader.Read())
                    {
                        authors.Add(new Author()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            name = DbUtils.GetString(reader, "name"),
                        });
                    }
                    reader.Close();
                    return authors;
                }
            }
        }

    }
}
