import { useState } from 'react';


export function Chat() {
    const [msgs, setMsgs] = useState([]);
    const [newMsg, setNewMsg] = useState('');

    function sendMsg() {
        if (!newMsg.trim()) return;
        setMsgs(prevMsgs => [...prevMsgs, { text: newMsg, sender: 'user' }]);
        setNewMsg('');

        setTimeout(() => {
            setMsgs(prevMsgs => [...prevMsgs, { text: 'Auto-reply: Hello!', sender: 'bot' }]);
        }, 1000);
    }

    return (
        <div className="chat">
            <div className="chat-messages">
                {msgs.map((msg, idx) => (
                    <div key={idx} className={`chat-msg ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                </div>
                <div className="chat-input">
                <input type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." />
                <button onClick={sendMsg}>Send</button>
            </div>
        </div>
    );
}