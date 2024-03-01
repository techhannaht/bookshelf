using bookshelf.Models;
using bookshelf.Utils;

namespace bookshelf.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {

        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firstName, lastName, userName, password, imageUrl 
                        FROM [User];";

                    List<User> userProfiles = new List<User>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        userProfiles.Add(new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            userName = DbUtils.GetString(reader, "userName"),
                            password = DbUtils.GetString(reader, "password"),
                            imageUrl = DbUtils.GetString(reader, "imageUrl"),
                        });
                    }
                    reader.Close();

                    return userProfiles;
                }
            }
        }

        public User GetByUserName(string userName)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firstName, lastName, userName, password, imageUrl 
                        FROM [User]
                        WHERE userName = @userName";

                    DbUtils.AddParameter(cmd, "@userName", userName);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            userName = DbUtils.GetString(reader, "userName"),
                            password = DbUtils.GetString(reader, "password"),
                            imageUrl = DbUtils.GetString(reader, "imageUrl"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, firstName, lastName, userName, password, imageUrl 
                        FROM [User]
                        WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            userName = DbUtils.GetString(reader, "userName"),
                            password = DbUtils.GetString(reader, "password"),
                            imageUrl = DbUtils.GetString(reader, "imageUrl"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public List<User> Search(string criterion)
        {
            List<User> users = new List<User>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql =
                        @"SELECT id, firstName, lastName, userName, password, imageUrl 
                FROM [User]
                WHERE userName LIKE @Criterion";

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var user = new User()
                            {
                                id = DbUtils.GetInt(reader, "id"),
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName"),
                                userName = DbUtils.GetString(reader, "userName"),
                                password = DbUtils.GetString(reader, "password"),
                                imageUrl = DbUtils.GetString(reader, "imageUrl"),
                            };

                            users.Add(user);
                        }
                    }
                }
            }

            return users;
        }


        public void Add(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (firstName, lastName, userName, 
                                                                 password, imageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firstName, @lastName, @userName, 
                                                @password, @imageUrl)";
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.lastName);
                    DbUtils.AddParameter(cmd, "@userName", userProfile.userName);
                    DbUtils.AddParameter(cmd, "@password", userProfile.password);
                    DbUtils.AddParameter(cmd, "@imageUrl", userProfile.imageUrl);

                    userProfile.id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
