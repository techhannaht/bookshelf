import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addMessage } from '../Managers/MessageManager';

export const MessageForm = ({ bookClubId }) => {

    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);
    const navigate = useNavigate();

    function refreshPage() {
        window.location.reload();
    }


    const [messageEntry, setMessageEntry] = useState({
        userId: +bookshelfUserObject.id,
        bookClubId: +bookClubId,
        content: "",
        sendDateTime: new Date()
    })

    const handleControlledInputChange = (e) => {

        const newMessageEntry = { ...messageEntry }

        newMessageEntry[`${e.target.name}`] = e.target.value

        setMessageEntry(newMessageEntry)
    }

    const saveEntry = (e) => {
        e.preventDefault()

        const entryToSend = {
            ...messageEntry,
            userId: +bookshelfUserObject.id,
            bookClubId: +bookClubId,
            sendDateTime: new Date()
        }

        addMessage(entryToSend)
            .then((p) => {
                p.json()
                    .then(x => {
                        refreshPage()
                    })
            }
            )

            .then(setMessageEntry({
                userId: +bookshelfUserObject.id,
                bookClubId: +bookClubId,
                content: "",
                sendDateTime: new Date()
            }))

            .catch(error => {
                console.error('Error adding post:', error);
                // Handle errors here, such as displaying an error message to the user
            });
    }

    return (
        <Form onSubmit={saveEntry}>
            <fieldset>
                <FormGroup>
                    <Input id="content" name="content" type="text" value={messageEntry.content} onChange={handleControlledInputChange} />
                    <Button  size="sm" color="primary" >Send Message</Button>
                </FormGroup>
            </fieldset>
        </Form>


    )
}

export default MessageForm;