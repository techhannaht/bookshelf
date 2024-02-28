using bookshelf.Models;
using bookshelf.Utils;
using Microsoft.Data.SqlClient;

namespace bookshelf.Repositories
{
    public class BookClubRepository : BaseRepository, IBookClubRepository
    {
        public BookClubRepository(IConfiguration configuration) : base(configuration) { }

        public List<BookClub> GetAllBookClubsByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.id AS ""Book Id"", b.userId, b.title, b.currentPage, b.totalPage, b.genreId, b.authorId,
                         u.id AS ""User Id"", u.firstName, u.lastName, u.userName, u.password, u.imageURL, bc.id, bc.bookId, bc.userId
                         FROM bookClub bc
                              LEFT JOIN Books b ON bc.bookId = b.id
                              LEFT JOIN [User] u ON bc.userId = u.id
                        WHERE u.Id = @userid     
                       ";

                    cmd.Parameters.AddWithValue("@userid", id);
                    var reader = cmd.ExecuteReader();

                    var bookClubs = new List<BookClub>();

                    while (reader.Read())
                    {
                        bookClubs.Add(NewBookClubFromReader(reader));
                    }

                    reader.Close();

                    return bookClubs;
                }
            }
        }

        public void AddBookClub(BookClub bookClub)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO BookClubs (userId, bookId)
                    OUTPUT INSERTED.ID
                    VALUES (@userId, @bookId)";
                    cmd.Parameters.AddWithValue("@userId", bookClub.userId);
                    cmd.Parameters.AddWithValue("@bookId", bookClub.bookId);

                    bookClub.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private BookClub NewBookClubFromReader(SqlDataReader reader)
        {
            return new BookClub()
            {
                id = reader.GetInt32(reader.GetOrdinal("id")),
                bookId = reader.GetInt32(reader.GetOrdinal("bookId")),
                Book = new Book()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Book Id")),
                    title = reader.GetString(reader.GetOrdinal("title")),
                    currentPage = reader.GetInt32(reader.GetOrdinal("currentPage")),
                    totalPage = reader.GetInt32(reader.GetOrdinal("totalPage")),
                    authorId = reader.GetInt32(reader.GetOrdinal("authorId")),
                    genreId = reader.GetInt32(reader.GetOrdinal("genreId")),
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
