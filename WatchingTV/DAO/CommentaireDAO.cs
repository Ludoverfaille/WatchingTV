﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WatchingTV.Models;

namespace WatchingTV.DAO
{
    public class CommentaireDAO
    {
        public static readonly string TABLE_NAME = "Commentaire";
        public static readonly string COLUMN_ID = "Id";
        public static readonly string COLUMN_CONTENU = "Contenu";
        public static readonly string COLUMN_IDFAVORI = "IdFavori";

        public static readonly string QUERY = "SELECT * FROM " + TABLE_NAME;
        public static readonly string GET = QUERY + " WHERE " + COLUMN_ID + " = @id";
        public static readonly string CREATE = "INSERT INTO " + TABLE_NAME
            + "(" + COLUMN_CONTENU + "," + COLUMN_IDFAVORI + ") OUTPUT INSERTED."
            + COLUMN_ID + " VALUES(@contenu, @idFavori)";

        //ATTENTION A MODIFIER SI UTILISE
        public static readonly string UPDATE = $"UPDATE {TABLE_NAME} SET {COLUMN_IDFAVORI} = @idFavori, {COLUMN_CONTENU} = @contenu WHERE {COLUMN_ID} = @id";
        public static readonly string DELETE = $"DELETE FROM {TABLE_NAME} WHERE {COLUMN_ID} = @id";


        public static List<Commentaire> Query()
        {
            List<Commentaire> commentaires = new List<Commentaire>();

            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(QUERY, connection);
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    commentaires.Add(new Commentaire(reader));
                }
            }
            return commentaires;
        }

        public static Commentaire Get(int id)
        {
            Commentaire commentaire = null;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(GET, connection);
                command.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    commentaire = new Commentaire(reader);
                }
            }
            return commentaire;
        }

        public static Commentaire Create(Commentaire commentaire)
        {
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();

                SqlCommand command = new SqlCommand(CREATE, connection);
                
                command.Parameters.AddWithValue("@contenu", commentaire.Contenu);
                command.Parameters.AddWithValue("@idFavori", commentaire.IdFavori);

                commentaire.Id = (int)command.ExecuteScalar();
            }
            return commentaire;
        }

        public static bool Update(Commentaire commentaire)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(UPDATE, connection);
                
                command.Parameters.AddWithValue("@contenu", commentaire.Contenu);
                command.Parameters.AddWithValue("@idFavori", commentaire.IdFavori);
                command.Parameters.AddWithValue("@id", commentaire.Id);

                hasBeenChanged = command.ExecuteNonQuery() != 0;
            }
            return hasBeenChanged;

        }

        public static bool Delete(int id)
        {
            bool hasBeenChanged = false;
            using (SqlConnection connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(DELETE, connection);
                command.Parameters.AddWithValue("@id", id);

                hasBeenChanged = command.ExecuteNonQuery() != 0;
            }
            return hasBeenChanged;
        }
    }
}