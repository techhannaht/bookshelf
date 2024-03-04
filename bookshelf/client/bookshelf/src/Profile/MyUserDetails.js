import { Button, Input } from "reactstrap";
import { getAllProfileInfoByUser } from "../Managers/UserManager";
import React, { useState, useEffect } from "react";


export function MyUserDetails() {
    const [user, setUser] = useState([]);
    const [bio, setBio] = useState(user.bio);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState(bio);

    const handleBioChange = (e) => {
        setEditedBio(e.target.value);
    };

    const handleSaveClick = () => {
        setBio(editedBio);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedBio(bio);
        setIsEditing(false);
    };

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
            <h1 className="mb-4">{user.fullName}</h1>
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
                <label className="font-weight-bold"> {user.userName} </label>
            </div>
            <div>
            {isEditing ? (
                <div>
                    <Input
                        type="text"
                        value={editedBio}
                        onChange={handleBioChange}
                    />
                    <Button onClick={handleSaveClick}>Save</Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </div>
            ) : (
                <div>
                    <label className="font-weight-bold">{bio}</label>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                </div>
            )}
        </div>
            <p></p>
        </>
    )
}