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
                    cmd.CommandText = @"SELECT b.id AS ""Book Id"", b.title, b.totalPage, b.genre, b.author,
                         u.id AS ""User Id"", u.firstName, u.lastName, u.userName, u.password, u.imageURL, bc.id, bc.bookId, bc.userId, bc.currentPage
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
                    INSERT INTO BookClubs (userId, bookId, currentPage)
                    OUTPUT INSERTED.ID
                    VALUES (@userId, @bookId, @currentPage)";
                    cmd.Parameters.AddWithValue("@userId", bookClub.userId);
                    cmd.Parameters.AddWithValue("@bookId", bookClub.bookId);
                    cmd.Parameters.AddWithValue("@bookId", bookClub.currentPage);

                    bookClub.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteBookClub(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                     DELETE FROM bookClub
                     WHERE id = @id
                     ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditBookClub(BookClub bookClub)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         UPDATE bookClub
                            SET 
                                userId = @userId,
                                bookId = @bookId,
                                currentPage = @currentPage
                            WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", bookClub.id);
                    cmd.Parameters.AddWithValue("@userId", bookClub.userId);
                    cmd.Parameters.AddWithValue("@bookId", bookClub.bookId);
                    cmd.Parameters.AddWithValue("@currentPage", bookClub.currentPage);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private BookClub NewBookClubFromReader(SqlDataReader reader)
        {
            return new BookClub()
            {
                id = reader.GetInt32(reader.GetOrdinal("id")),
                currentPage = reader.GetInt32(reader.GetOrdinal("currentPage")),
                bookId = reader.GetInt32(reader.GetOrdinal("bookId")),
                Book = new Book()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Book Id")),
                    title = reader.GetString(reader.GetOrdinal("title")),
                    totalPage = reader.GetInt32(reader.GetOrdinal("totalPage")),
                    author = reader.GetString(reader.GetOrdinal("author")),
                    genre = reader.GetString(reader.GetOrdinal("genre")),
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
