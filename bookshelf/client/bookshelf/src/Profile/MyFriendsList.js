import { getAllFollowsByLoggedInUser } from "../Managers/FollowManager";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function MyFriendsList() {
    const [friends, setFriends] = useState([]);

    const getFriends = () => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllFollowsByLoggedInUser(bookshelfUserObject.id).then(allInfo => setFriends(allInfo));
    };

    useEffect(() => {
        getFriends();
    }, []);

    console.log(friends);

    return (
        <>
            <h1><i>Friends</i></h1>
            <ul className="list-group mt-4">
            {friends.map((friend, index) => (
                    <li key={index} className="list-group-item">
                    <Link to={`/profile/${friend.friendId}`}>{friend.user?.userName}</Link>
                </li>
                ))}
            </ul>
        </>
    )
}