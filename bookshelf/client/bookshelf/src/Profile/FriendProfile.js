import { getallprofiles } from '../Managers/UserManager';
import React, { useState, useEffect } from "react";
import { CurrentlyReading } from './CurrentlyReading';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { UserDetails } from './UserDetails';
import { FriendsList } from './FriendsList';
import { BookClubs } from './BookClubs';


export default function FriendProfile() {

    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // fetch all users data
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            // fetch profile data
            const usersData = await getallprofiles();
            const friend = usersData.find(x => x.id == id)
            setUser(friend);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <>
            <section className="bookshelf-userdetails-friendslist">
                {/* User Details Section */}
                <div className="user-details">
                    <UserDetails userId={id} />
                </div>
                {/* Friends List */}
                <div className="friends-list">
                    <FriendsList userId={id} />
                </div>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs">
                {/* Currently Reading */}
                <div className="currently-reading">
                    <div className="currently-reading">
                        <CurrentlyReading userId={id} />
                    </div>
                </div>
                {/* Book Clubs */}
                <div className="book-clubs">
                    <BookClubs userId={id} />
                </div>
            </section>
        </>
    )
}