import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import './Chatroom.css';
import { getAllMessagesByBookClub } from '../Managers/MessageManager';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';


function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const { id } = useParams();

    // Fetch messages from the server
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        getAllMessagesByBookClub(id)
            .then(data => {
                setMessages(data);
            })
    };

    const addMessage = (newMessage) => {
        setMessages([...messages, newMessage]);
    };

    return (
        <>
            <div className="App">
                <h3> Book Club </h3>
                <MessageList messages={messages} />
                <SendMessage addMessage={addMessage} bookClubId={id} />
                <Link to="/">
                    <Button color="warning" >Back to Profile</Button>
                </Link>
            </div>
        </>
    );
}

export default ChatRoom;
