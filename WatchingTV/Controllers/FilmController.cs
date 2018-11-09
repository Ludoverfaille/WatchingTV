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
    public class FilmController : ApiController
    {
        public List<Film> Get()
        {
            return FilmDAO.Query();
        }

        
        public Film Get(int id)
        {
            return FilmDAO.Get(id);
        }

        public Film Post(Film film)
        {
            return FilmDAO.Create(film);
        }

        public IHttpActionResult Put(Film film)
        {
            if (FilmDAO.Update(film))
            {
                return Ok();
            }

            return BadRequest();
        }

        public IHttpActionResult Delete(int id)
        {
            if (FilmDAO.Delete(id))
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}