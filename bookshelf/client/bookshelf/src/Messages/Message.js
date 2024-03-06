import React from 'react';
import { deleteMessage } from '../Managers/MessageManager';
import { Button } from 'reactstrap';

function Message({ message }) {

    function refreshPage() {
        window.location.reload();
    }

    return (
        <>
           <div style={{ display: 'flex', marginBottom: '10px' }}>
            <div style={{ marginRight: '10px', alignSelf: 'flex-end' }}>
                <Button aria-label='delete item' onClick={() => { deleteMessage(message.id); refreshPage(); }} type='button' size='sm'>X</Button>
            </div>
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
