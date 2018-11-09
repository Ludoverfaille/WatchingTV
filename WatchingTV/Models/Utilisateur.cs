using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using WatchingTV.DAO;

namespace WatchingTV.Models
{
    public class Utilisateur
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "username")]
        public string Username { get; set; }
        [JsonProperty(PropertyName = "isAdmin")]
        public bool IsAdmin { get; set; }
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
        


        public Utilisateur(SqlDataReader reader)
        {
            Id = Int32.Parse(reader[UtilisateurDAO.COLUMN_ID].ToString());
            Username = reader[UtilisateurDAO.COLUMN_USERNAME].ToString();
            IsAdmin = Boolean.Parse(reader[UtilisateurDAO.COLUMN_IS_ADMIN].ToString());
            Password = reader[UtilisateurDAO.COLUMN_PASSWORD].ToString();
        }

        public Utilisateur  ()
        {

        }

    }
}