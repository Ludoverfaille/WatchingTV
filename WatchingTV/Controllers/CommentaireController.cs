using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WatchingTV.DAO;
using WatchingTV.Models;

namespace WatchingTV.Controllers
{
    public class CommentaireController : ApiController
    {
        public List<Commentaire> Get()
        {
            return CommentaireDAO.Query();
        }

        public Commentaire Get(int id)
        {
            return CommentaireDAO.Get(id);
        }

        public Commentaire Post(Commentaire commentaire)
        {
            return CommentaireDAO.Create(commentaire);
        }
        
        public IHttpActionResult Put(Commentaire commentaire)
        {
            if (CommentaireDAO.Update(commentaire))
            {
                return Ok();
            }

            return BadRequest();
        }

        public IHttpActionResult Delete(int id)
        {
            if (CommentaireDAO.Delete(id))
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}