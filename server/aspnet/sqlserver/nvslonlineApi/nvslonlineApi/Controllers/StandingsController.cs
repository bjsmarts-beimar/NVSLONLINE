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
    public class StandingsController : ApiController
    {
        private NVSLOnlineDataContext db = new NVSLOnlineDataContext();

        // GET: api/Standings
        public IQueryable<Standings> GetStandings()
        {
            //return db.Standings;
            var standings = db.Standings.Include(d => d.Divisions)
                .Include(t => t.Teams);

            return standings;

        }

        // GET: api/Standings/5
        [ResponseType(typeof(Standings))]
        public IHttpActionResult GetStandings(int id)
        {
            //Standings standings = db.Standings.Find(id);
            var standings = db.Standings.Include(d => d.Divisions)
                .Include(t => t.Teams)
                .SingleOrDefault(x => x.Id == id);

            if (standings == null)
            {
                return NotFound();
            }

            return Ok(standings);
        }

        // PUT: api/Standings/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStandings(int id, Standings standings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != standings.Id)
            {
                return BadRequest();
            }

            db.Entry(standings).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StandingsExists(id))
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

        // POST: api/Standings
        [ResponseType(typeof(Standings))]
        public IHttpActionResult PostStandings(Standings standings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Standings.Add(standings);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = standings.Id }, standings);
        }

        // DELETE: api/Standings/5
        [ResponseType(typeof(Standings))]
        public IHttpActionResult DeleteStandings(int id)
        {
            Standings standings = db.Standings.Find(id);
            if (standings == null)
            {
                return NotFound();
            }

            db.Standings.Remove(standings);
            db.SaveChanges();

            return Ok(standings);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StandingsExists(int id)
        {
            return db.Standings.Count(e => e.Id == id) > 0;
        }
    }
}