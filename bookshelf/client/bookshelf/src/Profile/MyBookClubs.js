import React, { useState, useEffect } from "react";
import { getAllBookClubsByLoggedInUser } from "../Managers/BookClubManager";
import { Link } from "react-router-dom";



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
                        <div className="card m-4" style={{ width: '18rem' }} key={bookClub.id}>
                            <div className="card-body text-center">
                                <Link to={`/bookClub/${bookClub?.id}`}>
                                    <label className="font-weight-bold" style={{ fontSize: '1.2em' }}><b>{bookClub?.book?.title}</b></label>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </>
    )
}