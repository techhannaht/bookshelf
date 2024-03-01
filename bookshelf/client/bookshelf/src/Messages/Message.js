import React from 'react';
import { deleteMessage } from '../Managers/MessageManager';


function Message({ message }) {''
    function refreshPage() {
        window.location.reload();
    }

    return (
        <div>
            <button aria-label='delete item' onClick={() => {deleteMessage(message.id); refreshPage(); }} type='button'>X</button>
            <strong>{message.user?.userName}</strong>: {message.content}
        </div>
    );
}

export default Message;
