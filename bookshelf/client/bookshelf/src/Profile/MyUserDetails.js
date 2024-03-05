import { Button, Input, Card } from "reactstrap";
import { getAllProfileInfoByUser } from "../Managers/UserManager";
import React, { useState, useEffect } from "react";


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
                    style={{ width: "100px", float: "left", marginRight: "20px", borderRadius: "50%", border: "2px solid #000", }}
                    src="https://cdn.pixabay.com/photo/2018/08/15/13/12/dog-3608037_960_720.jpg"
                    className="card-img-top"
                    alt="Default"
                />
            ) : (
                <img
                    style={{ width: "100px", float: "left", marginRight: "20px", borderRadius: "50%", border: "2px solid #000" }}
                    src={user.imageUrl}
                />
            )}
            <div>
                <label className="font-weight-bold"> @{user.userName} </label>
            </div>
            <div>
                <Card style={{ width: '400px', height: '100px', border: '1px solid #ccc', padding: '40px', boxSizing: 'border-box' }}>
                    <label className="font-weight-bold"><i>{user.bio}</i></label>
                </Card>
            </div>
            <p></p>
        </>
    )
}