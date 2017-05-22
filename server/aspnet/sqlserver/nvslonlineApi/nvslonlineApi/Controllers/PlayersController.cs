using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using nvslonlineApi.Models;

namespace nvslonlineApi.Controllers
{
    public class PlayersController : ApiController
    {
        private NVSLOnlineDataContext db = new NVSLOnlineDataContext();

        // GET: api/Players
        public IQueryable<Players> GetPlayers()
        {            
            var players = db.Players.Include(t => t.Teams);                

            return players;
        }

        // GET: api/Players/5
        [ResponseType(typeof(Players))]
        public IHttpActionResult GetPlayers(int id)
        {
            //Players players = db.Players.Find(id);

            var players = db.Players.Include(t => t.Teams)                
                .SingleOrDefault(x => x.Id == id);


            if (players == null)
            {
                return NotFound();
            }

            return Ok(players);
        }

        // PUT: api/Players/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPlayers(int id, Players players)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != players.Id)
            {
                return BadRequest();
            }

            db.Entry(players).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Players
        [ResponseType(typeof(Players))]
        public IHttpActionResult PostPlayers(Players players)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Players.Add(players);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = players.Id }, players);
        }

        // DELETE: api/Players/5
        [ResponseType(typeof(Players))]
        public IHttpActionResult DeletePlayers(int id)
        {
            Players players = db.Players.Find(id);
            if (players == null)
            {
                return NotFound();
            }

            db.Players.Remove(players);
            db.SaveChanges();

            return Ok(players);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlayersExists(int id)
        {
            return db.Players.Count(e => e.Id == id) > 0;
        }
    }
}