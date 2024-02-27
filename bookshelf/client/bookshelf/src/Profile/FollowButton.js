import React, { useState, useEffect } from 'react';
import { addFollow, deleteFollow, getAllFollowsByLoggedInUser } from '../Managers/FollowManager';
import { Button } from "reactstrap";

const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);

    if (bookshelfUserObject) {
      getAllFollowsByLoggedInUser(bookshelfUserObject.id)
        .then(follows => {
          const alreadyFollows = follows.some(follow => follow.friendId === userId);
          setIsFollowing(alreadyFollows); 
        });
    }
  }, [userId]);

  const handleFollowClick = () => {
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);
  
    if (bookshelfUserObject) {
      const followData = {
        userId: bookshelfUserObject.id,
        friendId: userId,
      };
  
      addFollow(followData)
        .then(response => {
          if (response && response.ok) {
            setIsFollowing(true);
          } 
        });
    }
  };
  
  const handleUnfollowClick = () => {
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);
  
    if (bookshelfUserObject) {
      deleteFollow(bookshelfUserObject.id, userId)
        .then(response => {
          if (response && response.ok) {
            setIsFollowing(false);
          } else {
            console.log("Error unfollowing");
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    }
  };

  return (
    <>
      <div>
        <Button onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
          style={{ backgroundColor: isFollowing ? 'rgb(255, 51, 53)' : 'rgb(0, 204, 153)' }}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </>
  );
};

export default FollowButton;

