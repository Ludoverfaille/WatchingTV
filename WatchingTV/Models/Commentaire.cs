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
        [JsonProperty(PropertyName = "element")]
        public int Element { get; set; }
        [JsonProperty(PropertyName = "elementType")]
        public string ElementType { get; set; }
        [JsonProperty(PropertyName = "utilisateur")]
        public int Utilisateur { get; set; }
        [JsonProperty(PropertyName = "contenu")]
        public string Contenu { get; set; }

        public Commentaire(SqlDataReader reader)
        {
            Id = Int32.Parse(reader[CommentaireDAO.COLUMN_ID].ToString());
            Element = Int32.Parse(reader[CommentaireDAO.COLUMN_ELEMENT].ToString());
            ElementType = reader[CommentaireDAO.COLUMN_ELEMENTTYPE].ToString();
            Utilisateur = Int32.Parse(reader[CommentaireDAO.COLUMN_UTILISATEUR].ToString());
            Contenu = reader[CommentaireDAO.COLUMN_CONTENU].ToString();
        }

        public Commentaire()
        {

        }
    }
}