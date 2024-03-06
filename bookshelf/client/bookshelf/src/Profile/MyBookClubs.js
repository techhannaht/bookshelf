import React, { useState, useEffect } from "react";
import { getAllBookClubsByLoggedInUser } from "../Managers/BookClubManager";
import { useParams } from "react-router-dom";
import { BookClubCard } from "./BookClubCard";

export function MyBookClubs() {

    const [bookClubs, setBookClubs] = useState([]);
    const { id } = useParams();
    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);
    
    useEffect(() => {
        getAllBookClubsByLoggedInUser().then(allInfo => setBookClubs(allInfo));
    }, [id]);

    return (
        <>
            <>
                <h1 className="text-center"><i>{bookshelfUserObject.firstName}'s Book Clubs</i></h1>
                <div className="row">
                    {bookClubs.map((bookClub) => (
                       <BookClubCard bookClub={bookClub}/>
                    ))}
                    
                </div>
            </>
        </>
    )
}