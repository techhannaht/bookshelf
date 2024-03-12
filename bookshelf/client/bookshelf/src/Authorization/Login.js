import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserManager";
import bookshelfLogo from '../Images/bookshelf-logo.png';


export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login({ userName, password })
            .then(r => {
                if (r) {
                    setIsLoggedIn(true)
                    navigate('/')
                }
                else {
                    alert("Invalid email or password")
                }
            })
    };

    return (
        <>
            <div className="text-center mb-4" >
                <img src={bookshelfLogo} alt="Logo" style={{ width: '1000px' }} />
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
                <div className="card p-4" style={{ width: '600px' }} >
                    <Form onSubmit={loginSubmit}>
                        <fieldset>
                            <FormGroup>
                                <Label for="userName">Username</Label>
                                <Input id="userName" type="text" onChange={e => setUserName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Button>Login</Button>
                            </FormGroup>
                            <em>
                                Not registered? <Link to="/register">Register</Link>
                            </em>
                        </fieldset>
                    </Form>
                </div>
            </div>
        </>
    );
}