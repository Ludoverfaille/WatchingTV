using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using WatchingTV.DAO;

namespace WatchingTV.Models
{
    public class Commentaire
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "idFavori")]
        public int IdFavori { get; set; }
        [JsonProperty(PropertyName = "contenu")]
        public string Contenu { get; set; }

        public Commentaire(SqlDataReader reader)
        {
            Id = Int32.Parse(reader[CommentaireDAO.COLUMN_ID].ToString());
            IdFavori = Int32.Parse(reader[CommentaireDAO.COLUMN_IDFAVORI].ToString());
            Contenu = reader[CommentaireDAO.COLUMN_CONTENU].ToString();
        }

        public Commentaire()
        {

        }
    }
}