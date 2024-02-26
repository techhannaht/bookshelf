using bookshelf.Models;
using bookshelf.Utils;
using Microsoft.Data.SqlClient;

namespace bookshelf.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration configuration) : base(configuration) { }
        public List<Book> GetAllBooksByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT b.id, b.userId, b.title, b.currentPage, b.totalPage, b.genreId, b.authorId,a.id AS ""Author Id"", a.name AS ""Author Name"", g.id AS ""Genre Id"", g.name AS ""Genre Name"", 
                                    u.id AS ""User Id"", u.firstName, u.lastName, u.userName, u.password, u.imageURL
                                    FROM Books b
                                    LEFT JOIN Author a ON b.authorId = a.id
                                    LEFT JOIN Genre g ON b.genreId = g.id
                                    LEFT JOIN [User] u ON b.userId = u.id
                                    WHERE u.Id = @userId
                       ";

                    cmd.Parameters.AddWithValue("@userid", id);
                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();

                    while (reader.Read())
                    {
                        books.Add(NewBookFromReader(reader));
                    }

                    reader.Close();

                    return books;
                }
            }
        }

        private Book NewBookFromReader(SqlDataReader reader)
        {
            return new Book()
            {
                id = reader.GetInt32(reader.GetOrdinal("id")),
                title = reader.GetString(reader.GetOrdinal("title")),
                currentPage = reader.GetInt32(reader.GetOrdinal("currentPage")),
                totalPage = reader.GetInt32(reader.GetOrdinal("totalPage")),
                authorId = reader.GetInt32(reader.GetOrdinal("authorId")),
                Author = new Author()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Author Id")),
                    name = reader.GetString(reader.GetOrdinal("Author Name"))
                },
                genreId = reader.GetInt32(reader.GetOrdinal("genreId")),
                Genre = new Genre()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Genre Id")),
                    name = reader.GetString(reader.GetOrdinal("Genre Name"))
                },
                userId = reader.GetInt32(reader.GetOrdinal("userId")),
                User = new User()
                {
                    id = reader.GetInt32(reader.GetOrdinal("User Id")),
                    firstName = DbUtils.GetString(reader, "firstName"),
                    lastName = DbUtils.GetString(reader, "lastName"),
                    userName = DbUtils.GetString(reader, "userName"),
                    password = DbUtils.GetString(reader, "password"),
                    imageUrl = DbUtils.GetString(reader, "imageUrl"),
                }
            };
        }


    }
}
