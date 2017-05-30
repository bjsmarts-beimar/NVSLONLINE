using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NvslOnlineCoreWebApi.Models;

namespace NvslOnlineCoreWebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Standings")]
    public class StandingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StandingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Standings
        [HttpGet]
        public IEnumerable<Standings> Getstandings()
        {
            return _context.standings;
        }

        // GET: api/Standings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStandings([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Standings standings = await _context.standings.SingleOrDefaultAsync(m => m.Id == id);

            if (standings == null)
            {
                return NotFound();
            }

            return Ok(standings);
        }

        // PUT: api/Standings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStandings([FromRoute] int id, [FromBody] Standings standings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != standings.Id)
            {
                return BadRequest();
            }

            _context.Entry(standings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            return NoContent();
        }

        // POST: api/Standings
        [HttpPost]
        public async Task<IActionResult> PostStandings([FromBody] Standings standings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.standings.Add(standings);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StandingsExists(standings.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStandings", new { id = standings.Id }, standings);
        }

        // DELETE: api/Standings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStandings([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Standings standings = await _context.standings.SingleOrDefaultAsync(m => m.Id == id);
            if (standings == null)
            {
                return NotFound();
            }

            _context.standings.Remove(standings);
            await _context.SaveChangesAsync();

            return Ok(standings);
        }

        private bool StandingsExists(int id)
        {
            return _context.standings.Any(e => e.Id == id);
        }
    }
}
