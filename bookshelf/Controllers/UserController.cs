using bookshelf.Models;
using bookshelf.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bookshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            //_userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("GetByUserName")]
        public IActionResult GetByUserName(string userName)
        {
            var user = _userRepository.GetByUserName(userName);

            if (userName == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var user = _userRepository.GetById(id);

            if (id == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Post(User userProfile)
        {
            _userRepository.Add(userProfile);
            return CreatedAtAction(
                "GetByUserName",
                new { username = userProfile.userName },
                userProfile);
        }
    }
}
