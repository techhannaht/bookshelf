using bookshelf.Models;
using bookshelf.Utils;
using Microsoft.Data.SqlClient;

namespace bookshelf.Repositories
{
    public class FollowRepository : BaseRepository, IFollowRepository
    {
        public FollowRepository(IConfiguration configuration) : base(configuration) { }


        public List<Follow> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT f.id, f.userId, f.friendId, u.id AS ""Friend Id"", u.firstName, u.lastName, u.userName, u.password, u.imageUrl
                        FROM Follow f
                        LEFT JOIN [User] u ON f.friendId = u.Id";
                    var reader = cmd.ExecuteReader();
                    var follows = new List<Follow>();
                    while (reader.Read())
                    {
                        follows.Add(new Follow()
                        {
                            id = DbUtils.GetInt(reader, "Id"),
                            userId = DbUtils.GetInt(reader, "userId"),
                            friendId = DbUtils.GetInt(reader, "friendId"),
                            User = new User()
                            {
                                id = DbUtils.GetInt(reader, ("Friend Id")),
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName"),
                                userName = DbUtils.GetString(reader, "userName"),
                                password = DbUtils.GetString(reader, "password"),
                                imageUrl = DbUtils.GetString(reader, "imageUrl"),
                            }
                        });
                    }
                    reader.Close();
                    return follows;
                }
            }
        }
        public void Add(Follow follow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Follow (
                            userId, friendId)
                        OUTPUT INSERTED.ID
                        VALUES(
                            @userId, @friendId )";
                    cmd.Parameters.AddWithValue("@userId ", follow.userId);
                    cmd.Parameters.AddWithValue("@friendId", follow.friendId);

                    follow.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int userId, int friendId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from Follow
                            WHERE userId = @userId
                            AND friendId = @friendId
                        ";
                    cmd.Parameters.AddWithValue("@userId ", userId);
                    cmd.Parameters.AddWithValue("@friendId", friendId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Follow> GetFollowsByLoggedInUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT f.id, f.userId, f.friendId, u.id AS ""Friend Id"", u.firstName, u.lastName, u.userName, u.password, u.imageUrl
                        FROM Follow f
                        LEFT JOIN [User] u ON f.friendId = u.Id
                       WHERE userId = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();


                    var follows = new List<Follow>();

                    while (reader.Read())
                    {
                        follows.Add(NewFollowFromReader(reader));
                    }

                    reader.Close();

                    return follows;
                }
            }
        }

        private Follow NewFollowFromReader(SqlDataReader reader)
        {
            return new Follow()
            {
                id = DbUtils.GetInt(reader, "Id"),
                userId = DbUtils.GetInt(reader, "userId"),
                friendId = DbUtils.GetInt(reader, "friendId"),
                User = new User()
                {
                    id = reader.GetInt32(reader.GetOrdinal("Friend Id")),
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
