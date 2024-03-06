import { Button, Input, Card } from "reactstrap";
import { getAllProfileInfoByUser } from "../Managers/UserManager";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export function MyUserDetails() {
    const [user, setUser] = useState([]);

    const getUser = () => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllProfileInfoByUser(bookshelfUserObject).then(allInfo => setUser(allInfo));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <h1 className="mb-4"><i>{user.fullName}</i></h1>
            {!user.imageUrl ? (
                <img
                    style={{ width: "150px", float: "left", marginRight: "20px", borderRadius: "50%", border: "2px solid #000060" }}
                    src="https://cdn.pixabay.com/photo/2018/08/15/13/12/dog-3608037_960_720.jpg"
                    className="card-img-top"
                    alt="Default"
                />
            ) : (
                <img
                    style={{ width: "170px", float: "left", marginRight: "20px", borderRadius: "50%", border: "2px solid #000060" }}
                    src={user.imageUrl}
                />
            )}
            <div>
                <p className="font-weight-bold"> <b> @{user.userName} </b> </p>
            </div>
            <div>
                <Card style={{ width: '400px', height: '100px', border: '1px solid ', padding: '30px', boxSizing: 'border-box' }}>
                    <label className="font-weight-bold"><i>{user.bio}</i></label>
                </Card>
            </div>
            <p></p>
            <p>
                <Link to="/editProfile" className="btn btn-primary">Edit Profile</Link>
            </p>
        </>
    )
}