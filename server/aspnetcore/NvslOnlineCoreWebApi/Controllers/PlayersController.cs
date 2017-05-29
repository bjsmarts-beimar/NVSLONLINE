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
    [Route("api/Players")]
    public class PlayersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PlayersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [HttpGet]
        public IEnumerable<Players> Getplayers()
        {
            return _context.players;
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Players players = await _context.players.SingleOrDefaultAsync(m => m.Id == id);

            if (players == null)
            {
                return NotFound();
            }

            return Ok(players);
        }

        // PUT: api/Players/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayers([FromRoute] int id, [FromBody] Players players)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != players.Id)
            {
                return BadRequest();
            }

            _context.Entry(players).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            return NoContent();
        }

        // POST: api/Players
        [HttpPost]
        public async Task<IActionResult> PostPlayers([FromBody] Players players)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.players.Add(players);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PlayersExists(players.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPlayers", new { id = players.Id }, players);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Players players = await _context.players.SingleOrDefaultAsync(m => m.Id == id);
            if (players == null)
            {
                return NotFound();
            }

            _context.players.Remove(players);
            await _context.SaveChangesAsync();

            return Ok(players);
        }

        private bool PlayersExists(int id)
        {
            return _context.players.Any(e => e.Id == id);
        }
    }
}
