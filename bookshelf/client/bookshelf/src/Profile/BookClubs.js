import React, { useState, useEffect } from "react";
import { getAllBookClubsByUser } from "../Managers/BookClubManager";
import { Link
 } from "react-router-dom";
export function BookClubs({ user }) {

    const [bookClubs, setBookClubs] = useState([]);

    const getBookClubs = () => {
        if (user.id)
        {
        getAllBookClubsByUser(user.id).then(allInfo => setBookClubs(allInfo));
        }
    };

    useEffect(() => {
        getBookClubs();
    }, [user]);

    return (
        <>
            <>
                <h1 className="text-center"><i>{user.firstName}'s Book Clubs</i></h1>
                <div className="row">
                    {bookClubs.map((bookClub) => (
                        <div className="card m-4" style={{ width: '18rem' }} key={bookClub.id}>
                            <div className="card-body text-center">
                                <Link to={`/bookClub/${bookClub?.bookId}`}>
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