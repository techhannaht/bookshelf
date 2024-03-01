import { getallprofiles } from '../Managers/UserManager';
import React, { useState, useEffect } from "react";
import { CurrentlyReading } from './CurrentlyReading';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { UserDetails } from './UserDetails';
import { FriendsList } from './FriendsList';
import { BookClubs } from './BookClubs';
import { Card } from 'reactstrap';
import { Link } from 'react-router-dom';


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
            <div className="bookshelf">
            <section className="bookshelf-userdetails-friendslist">
                {/* User Details Section */}
                <Card className="user-details">
                <UserDetails userId={id}/>
                </Card>
                {/* Friends List */}
                <Card className="friends-list">
                <FriendsList userId={id}/>
                </Card>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs">
                {/* Currently Reading */}
                <Card className="currently-reading">
                <CurrentlyReading userId={id} />
                <Link to="/addBook" className="btn btn-primary">Add A Book</Link>
                </Card>
                {/* Book Clubs */}
                <Card className="book-clubs">
                <BookClubs userId={id}/>
                </Card>
            </section>
        </div>
        </>
    )
}