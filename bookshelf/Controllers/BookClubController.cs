using bookshelf.Models;
using bookshelf.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bookshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookClubController : ControllerBase
    {

        private readonly IBookRepository _bookRepository;
        private readonly IBookClubRepository _bookClubRepository;
        public BookClubController(IBookRepository bookRepository, IBookClubRepository bookClubRepository)
        {
            _bookRepository = bookRepository;
            _bookClubRepository = bookClubRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult GetAllBookClubsByUser(int userId)
        {

            return Ok(_bookClubRepository.GetAllBookClubsByUser(userId));
        }

        [HttpGet("currentlyreading/{userId}")]
        public IActionResult GetAllCurrentlyReadingBookClubsByUser(int userId)
        {

            return Ok(_bookClubRepository.GetAllCurrentlyReadingBookClubsByUser(userId));
        }

        [HttpGet("tbr/{userId}")]
        public IActionResult GetAllTBRBookClubsByUser(int userId)
        {

            return Ok(_bookClubRepository.GetAllTBRBookClubsByUser(userId));
        }

        [HttpGet("finished/{userId}")]
        public IActionResult GetAllFinsihedBookClubsByUser(int userId)
        {

            return Ok(_bookClubRepository.GetAllFinishedBookClubsByUser(userId));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, BookClub bookClub)
        {
            if (id != bookClub.id)
            {
                return BadRequest();
            }

            _bookClubRepository.EditBookClub(bookClub);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookClubRepository.DeleteBookClub(id);
            return NoContent();
        }

    }
}
