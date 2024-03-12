import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserManager";
import registerLogo from '../Images/register-logo.png';


export default function Register({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [bio, setBio] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, userName, imageUrl, bio, password };
            register(userProfile)
                .then(() => {
                    setIsLoggedIn(true)
                    navigate('/')
                });
        }
    };

    return (
        <>
        <div className="text-center mb-4" >
        <img src={registerLogo} alt="Logo" style={{ width: '700px' }} />
    </div>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
            <div className="card p-4" style={{ width: '1000px' }}> 
                <Form onSubmit={registerClick}>
                    <fieldset>
                        <FormGroup>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="userName">User Name</Label>
                            <Input id="userName" type="text" onChange={e => setUserName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="imageUrl">Profile Image URL</Label>
                            <Input id="imageUrl" type="text" onChange={e => setImageUrl(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="bio">Bio</Label>
                            <Input id="bio" type="text" onChange={e => setBio(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Button>Register</Button>
                        </FormGroup>
                    </fieldset>
                </Form>
            </div>
        </div>
        </>
    );
}