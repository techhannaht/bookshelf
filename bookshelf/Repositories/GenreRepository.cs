using bookshelf.Models;
using bookshelf.Utils;

namespace bookshelf.Repositories
{
    public class GenreRepository : BaseRepository, IGenreRepository
    {
        public GenreRepository(IConfiguration configuration) : base(configuration) { }

        public List<Genre> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, [name]
                        FROM Genre
                       ";
                    var reader = cmd.ExecuteReader();
                    var genres = new List<Genre>();
                    while (reader.Read())
                    {
                        genres.Add(new Genre()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            name = DbUtils.GetString(reader, "name"),
                        });
                    }
                    reader.Close();
                    return genres;
                }
            }
        }

    }
}
