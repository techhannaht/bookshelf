import { getAllProfileInfoById } from "../Managers/UserManager";
import React, { useState, useEffect } from "react";
import FollowButton from "./FollowButton";

export function UserDetails({userId}) {
    const [user, setUser] = useState([]);

    const getUser = () => {
        getAllProfileInfoById(userId).then(allInfo => setUser(allInfo));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <h1 className="mb-4">{user.fullName}</h1>
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
                <label className="font-weight-bold"> {user.userName} </label>
            </div>
            <div>
                <label className="font-weight-bold">Total friends: </label>
                <span> # of friends </span>
            </div>
            <p></p>
            <FollowButton userId={userId}/>
        </>
    )
}