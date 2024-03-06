import React, { useState } from "react";
import { useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllProfileInfoById, getAllProfileInfoByUser } from "../Managers/UserManager";
import { useNavigate } from "react-router-dom";

function refreshPage() {
    window.location.reload();
}

export function EditProfile() {
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [editUser, setEditUser] = useState({
        id: '',
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        imageUrl: '',
        bio: ''
    });

    useEffect(() => {
        const localBookshelfUser = localStorage.getItem("userProfile");
        const bookshelfUserObject = JSON.parse(localBookshelfUser);

        getAllProfileInfoByUser(bookshelfUserObject)
            .then(allInfo => {
                setUser(allInfo);
                setEditUser(allInfo); // Set editUser with the retrieved user data
            });
    }, []);

    const handleControlledInputChange = (e) => {
        const newUserEntry = { ...editUser };
        newUserEntry[e.target.name] = e.target.value;
        setEditUser(newUserEntry);
    }

    const UpdateEntry = (e) => {
        e.preventDefault();

        const entryToSend = {
            id: editUser.id,
            userName: editUser.userName,
            password: editUser.password,
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            imageUrl: editUser.imageUrl,
            bio: editUser.bio
        };

        fetch(`https://localhost:5001/api/User/${editUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entryToSend),
        }).then(r => r.json)
        .then(() => navigate(`/`))
    }

    return (
        <div className="card m-4" style={{ width: '18rem' }}>
            <div className="card-body text-center">
                <p>
                    UserName
                    <Input name="userName" type="text" placeholder="" value={editUser.userName} onChange={handleControlledInputChange} />
                </p>
                <p>
                    Password
                    <Input name="password" type="text" placeholder="" value={editUser.password} onChange={handleControlledInputChange} />
                </p>
                <p>
                   First Name
                    <Input name="firstName" type="text" placeholder="" value={editUser.firstName} onChange={handleControlledInputChange} />
                </p>
                <p>
                  Last Name
                    <Input name="lastName" type="text" placeholder="" value={editUser.lastName} onChange={handleControlledInputChange} />
                </p>
                <p>
                    Profile Picture
                    <Input name="imageUrl" type="text" placeholder="" value={editUser.imageUrl} onChange={handleControlledInputChange} />
                </p>
                <p>
                    Bio
                    <Input name="bio" type="text" placeholder="" value={editUser.bio} onChange={handleControlledInputChange} />
                </p>
            </div>
            <Button className="btn btn-success" onClick={UpdateEntry}>Save</Button>
        </div>
    );
}
