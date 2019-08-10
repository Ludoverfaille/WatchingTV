using Newtonsoft.Json;
using System;
using System.Data.SqlClient;
using WatchingTV.DAO;

namespace WatchingTV.Models
{
    public class Favori
    {
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "idAPI")]
        public int IdAPI { get; set; }
        [JsonProperty(PropertyName = "element")]
        public int Element { get; set; }
        [JsonProperty(PropertyName = "elementType")]
        public string ElementType { get; set; }
        [JsonProperty(PropertyName = "utilisateur")]
        public int Utilisateur { get; set; }

        public Favori(SqlDataReader reader)
        {
            Id = Int32.Parse(reader[FavoriDAO.COLUMN_ID].ToString());
            IdAPI = Int32.Parse(reader[FavoriDAO.COLUMN_IDAPI].ToString());
            Element = Int32.Parse(reader[FavoriDAO.COLUMN_ELEMENT].ToString());
            ElementType = reader[FavoriDAO.COLUMN_ELEMENTTYPE].ToString();
            Utilisateur = Int32.Parse(reader[FavoriDAO.COLUMN_UTILISATEUR].ToString());
        }

        public Favori()
        {

        }
    }
}