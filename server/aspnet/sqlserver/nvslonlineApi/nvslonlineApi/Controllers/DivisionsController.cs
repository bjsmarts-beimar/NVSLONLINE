﻿using System;
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
    public class DivisionsController : ApiController
    {
        private NVSLOnlineDataContext db = new NVSLOnlineDataContext();

        // GET: api/Divisions
        public IQueryable<Division> GetDivisions()
        {
            return db.Divisions;
        }

        // GET: api/Divisions/5
        [ResponseType(typeof(Division))]
        public IHttpActionResult GetDivision(int id)
        {
            Division division = db.Divisions.Find(id);
            if (division == null)
            {
                return NotFound();
            }

            return Ok(division);
        }

        // PUT: api/Divisions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDivision(int id, Division division)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != division.Id)
            {
                return BadRequest();
            }

            db.Entry(division).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DivisionExists(id))
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

        // POST: api/Divisions
        [ResponseType(typeof(Division))]
        public IHttpActionResult PostDivision(Division division)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Divisions.Add(division);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = division.Id }, division);
        }

        // DELETE: api/Divisions/5
        [ResponseType(typeof(Division))]
        public IHttpActionResult DeleteDivision(int id)
        {
            Division division = db.Divisions.Find(id);
            if (division == null)
            {
                return NotFound();
            }

            db.Divisions.Remove(division);
            db.SaveChanges();

            return Ok(division);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DivisionExists(int id)
        {
            return db.Divisions.Count(e => e.Id == id) > 0;
        }
    }
}