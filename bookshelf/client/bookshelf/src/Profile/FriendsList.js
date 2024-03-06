import { getAllFollowsByLoggedInUser } from "../Managers/FollowManager";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


export function FriendsList({ user, fetchAllUsers }) {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate()

    const getFriends = () => {
        if (user.id) {

            getAllFollowsByLoggedInUser(user.id).then(allInfo => setFriends(allInfo));
        }
    };

    useEffect(() => {
        getFriends();
    }, [user]);

    return (
        <>
            <h1><i>Friends</i></h1>
            <ul className="list-group mt-4">
                {friends.map((friend, index) => (
                    <li key={index} className="list-group-item">
                        <h6 onClick={() => {
                            fetchAllUsers(friend.friendId)
                                .then(() => navigate(`/profile/${friend.friendId}`))
                        }} 
                        style={{ color: 'blue', cursor: 'pointer' }}
                        >{friend.user?.userName}</h6>
                    </li>
                ))}
            </ul>
        </>
    )
}