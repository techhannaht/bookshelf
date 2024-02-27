using bookshelf.Models;
using bookshelf.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bookshelf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly IFollowRepository _followRepository;
        private readonly IUserRepository _userRepository;
        public FollowController(IFollowRepository followRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _followRepository = followRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_followRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Follow? follow)
        {
            _followRepository.Add(follow);
            return NoContent();
        }


        [HttpGet("{userId}")]
        public IActionResult GetFollowsByLoggedInUserId(int userId)
        {

            return Ok(_followRepository.GetFollowsByLoggedInUserId(userId));
        }


        [HttpDelete("{userId}/{friendId}")]
        public IActionResult Delete(int userId, int friendId)
        {
            _followRepository.Delete(userId, friendId);
            return NoContent();
        }

    }
}
