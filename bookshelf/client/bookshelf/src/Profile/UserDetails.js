import { getAllProfileInfoById } from "../Managers/UserManager";
import React, { useState, useEffect } from "react";
import FollowButton from "./FollowButton";
import { Card } from "reactstrap";

export function UserDetails({ userprop }) {
    const [user, setUser] = useState([]);

    const getUser = () => {
        getAllProfileInfoById(userprop.id).then(allInfo => setUser(allInfo));
    };

    useEffect(() => {
        getUser();
    }, [userprop]);

    return (
        <>
            <h1 className="mb-4"><i>{user.fullName}</i></h1>
            {!user.imageUrl ? (
                <img
                    style={{ width: "100px", float: "left", marginRight: "20px", borderRadius: "50%", }}
                    src="https://cdn.pixabay.com/photo/2018/08/15/13/12/dog-3608037_960_720.jpg"
                    className="card-img-top"
                    alt="Default"
                />
            ) : (
                <img
                    style={{ width: "100px", float: "left", marginRight: "20px", borderRadius: "50%", }}
                    src={user.imageUrl}
                />
            )}
            <div>
                <label className="font-weight-bold"> @{user.userName} </label>

            </div>
            <Card style={{ width: '400px', height: '100px', border: '1px solid #ccc', padding: '40px', boxSizing: 'border-box' }}>
                <label className="font-weight-bold"><i>{user.bio}</i></label>
            </Card>
            <p></p>
            <FollowButton userId={userprop.id} />
        </>
    )
}