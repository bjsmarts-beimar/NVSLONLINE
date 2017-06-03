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
    public class SchedulesController : ApiController
    {
        private NVSLOnlineDataContext db = new NVSLOnlineDataContext();

        // GET: api/Schedules
        public IQueryable<Schedule> GetSchedules()
        {
            //return db.Schedules;

            var schedules = db.Schedules
                .Include(d => d.Division)
                .Include(s => s.Season)
                .Include(h => h.HomeTeam)
                .Include(w => w.AwayTeam)
                .Include(a => a.Venue);

            return schedules;

        }

        // GET: api/Schedules/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult GetSchedule(int id)
        {
            //Schedule schedule = db.Schedules.Find(id);

            var schedule = db.Schedules.Include(d => d.Division)
                .Include(s => s.Season)
                .Include(h => h.HomeTeam)
                .Include(w => w.AwayTeam)
                .Include(a => a.Venue)
                .SingleOrDefault(x => x.Id == id);

            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }

        // PUT: api/Schedules/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSchedule(int id, Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != schedule.Id)
            {
                return BadRequest();
            }

            db.Entry(schedule).State = EntityState.Modified; 
            

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
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

        // POST: api/Schedules
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult PostSchedule(Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Schedules.Add(schedule);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = schedule.Id }, schedule);
        }

        // DELETE: api/Schedules/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult DeleteSchedule(int id)
        {
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null)
            {
                return NotFound();
            }

            db.Schedules.Remove(schedule);
            db.SaveChanges();

            return Ok(schedule);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScheduleExists(int id)
        {
            return db.Schedules.Count(e => e.Id == id) > 0;
        }
    }
}