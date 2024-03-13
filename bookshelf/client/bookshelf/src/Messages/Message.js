import React from 'react';
import { Button } from 'reactstrap';
import { getAllMessagesByBookClub } from '../Managers/MessageManager';

function Message({  setMessages, message, bookClubId }) {

    const localBookshelfUser = localStorage.getItem("userProfile");
    const bookshelfUserObject = JSON.parse(localBookshelfUser);


    const DeleteMessage = (e) => {
       
        return fetch(`https://localhost:5001/api/Messages/${message.id}`, { method: "DELETE" })
        .then(() => {
            return getAllMessagesByBookClub(bookClubId)
        })
        .then(allMessages => setMessages(allMessages));
    }

    function handleDelete() {
        if (bookshelfUserObject.id === message.userId) {
            DeleteMessage(message.id);
        } else {
            // Display a message or handle the case where the user is not authorized to delete this message
            alert('You are not authorized to delete this message.');
        }
    }
    return (
        <>
           <div style={{ display: 'flex', marginBottom: '10px' }}>
                {bookshelfUserObject.id === message.userId && (
                    <div style={{ marginRight: '10px', alignSelf: 'flex-end' }}>
                        <Button aria-label='delete item' onClick={handleDelete} type='button' size='sm'>X</Button>
                    </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ marginRight: '5px' }}>{message.user?.userName}</strong>
                        <span style={{ fontSize: '12px', color: '#777' }}>{message.sendDateTime}</span>
                    </div>
                    <div style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '8px', maxWidth: '100%', wordWrap: 'break-word' }}>
                        <p style={{ margin: 0 }}>{message.content}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;
