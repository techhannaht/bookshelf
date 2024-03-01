import React, { useState, useEffect } from "react";
import { getAllBookClubsByLoggedInUser } from "../Managers/BookClubManager";
import { Link } from "react-router-dom";
import { deleteBookClub } from "../Managers/BookClubManager";
import { Button } from "reactstrap";
import { Trash } from 'react-bootstrap-icons';
import { BookClubCard } from "./BookClubCard";

function refreshPage() {
    window.location.reload();
}


export function MyBookClubs() {

    const [bookClubs, setBookClubs] = useState([]);

    const getBookClubs = () => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllBookClubsByLoggedInUser(bookshelfUserObject.id).then(allInfo => setBookClubs(allInfo));
    };

    useEffect(() => {
        getBookClubs();

    }, []);

    return (
        <>
            <>
                <h1 className="text-left"><i>Book Clubs</i></h1>
                <div className="row">
                    {bookClubs.map((bookClub) => (
                       <BookClubCard bookClub={bookClub}/>
                    ))}
                    
                </div>
            </>
        </>
    )
}