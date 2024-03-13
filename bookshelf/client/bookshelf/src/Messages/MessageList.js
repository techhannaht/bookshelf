import React from 'react';
import Message from './Message';
import './Chatroom.css';

function MessageList({ setMessages , messages, bookClubId  }) {
  return (
    <div className="message-list">
      {messages.map(message => (
        <Message key={message.id} bookClubId={bookClubId} setMessages={setMessages} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
