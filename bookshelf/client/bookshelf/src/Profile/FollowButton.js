import React, { useState, useEffect } from 'react';
import {Button } from "reactstrap";
import { addFollow, deleteFollow, getAllFollowsByLoggedInUser } from '../Managers/FollowManager';

const FollowButton = ({user}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // checks for follow
  useEffect(() => {
    const checkFollow = async () => {
      try {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);
        const follows = await getAllFollowsByLoggedInUser(bookshelfUserObject.id);
        const alreadyFollows = follows.some(
          follow => follow.friendId === user.id
        );
        setIsFollowing(alreadyFollows);
      } catch (error) {
        console.error('Error checking follow:', error.message);
      }
    };

    checkFollow();
  }, [user.id]);

  // handles adding a subscription
  const handleFollowClick = async () => {
    try {

      // Logged in user data
      const localBookshelfUser = localStorage.getItem("userProfile");
      const bookshelfUserObject = JSON.parse(localBookshelfUser);

      // Fetch user subscriptions
      const follows = await getAllFollowsByLoggedInUser(bookshelfUserObject.id);
      console.log(follows);

      // Set a conditional to check if the userprofileID for the provider matches the post userProfileId
        const alreadyFollows = follows.some(
          follow => follow.friendId === user.id
        );

      if (alreadyFollows) {
        setIsFollowing(true);
        return;
      }

      // subscription data
      const followData = {
        userId: bookshelfUserObject.id,
        friendId: user.Id,
      };

      // HTTP POST request 
      const response = await addFollow(followData);

      // If the response if okay set isSubscribed to true 
      if (response.ok) {
        setIsFollowing(true);
      } else {
        console.log("Try again :(")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

   // handles unsubscribing to a user 
   const handleUnfollowClick = async () => {
    try {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);
      const response = await deleteFollow(bookshelfUserObject.id, user.id);

      if (response.ok) {
        setIsFollowing(false);
      } else {
        console.log("Error unfollowing");
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <Button onClick={isFollowing? handleUnfollowClick : handleFollowClick}
       style={{ backgroundColor: isFollowing? 'rgb(255, 51, 53)' : 'rgb(0, 204, 153)' }}>
        {isFollowing? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};

export default FollowButton;