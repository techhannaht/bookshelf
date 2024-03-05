import { getAllProfileInfoById, getallprofiles } from '../Managers/UserManager';
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
    const [idState, setIdState] = useState()
    
    const { id } = useParams();

    let changeId = id

    useEffect(() => {
        // fetch all users data
        fetchAllUsers(id);
    }, []);
    
    useEffect(() => {
        if(changeId == user.id){
            setIdState(changeId)
        }
         console.log(changeId)
    },[user])

    const fetchAllUsers = (paramId) => {
           return getAllProfileInfoById(paramId)
            .then((friend) => setUser(friend))
    };

    return (
        <>
            <div className="bookshelf">
            <section className="bookshelf-userdetails-friendslist">
                {/* User Details Section */}
                <section className="user-details">
                <UserDetails userprop={user} />
                </section>
                {/* Friends List */}
                <section className="friends-list">
                <FriendsList user={user} fetchAllUsers={fetchAllUsers}/>
                </section>
            </section>
            <section className="bookshelf-currentlyreading-bookclubs"  style={{ paddingLeft: '20px' }} >
                {/* Currently Reading */}
                <Card className="currently-reading">
                <CurrentlyReading user={user} />
                </Card>
                {/* Book Clubs */}
                <Card className="book-clubs">
                <BookClubs user={user} />
                </Card>
            </section>
        </div>
        </>
    )
}