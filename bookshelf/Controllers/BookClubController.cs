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

    }
}
