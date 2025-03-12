import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toyService } from '../services/toyService';
import '../assets/cmps/ToyDetails.css';
import { NicePopup } from './NicePopup';
import { Chat } from './Chat';

export function ToyDetails() {
    const { toyId } = useParams();
    const navigate = useNavigate();
    const [toy, setToy] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        loadToy();
    }, [toyId]); 
    
    function loadToy() {
        toyService.getById(toyId)
            .then(toy => {
                if (!toy) {
                    console.warn(`❌ Toy with ID ${toyId} not found, redirecting...`);
                    navigate('/');
                    return;
                }
                setToy(toy);
            })
            .catch(err => {
                console.error('❌ Error fetching toy:', err);
                navigate('/');
            });
    }

    function toggleChat() {
        setIsChatOpen(prev => !prev);
    }

    if (!toy) return <h2>Loading...</h2>;

    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <p>Price: ${toy.price}</p>
            <p>Labels: {Array.isArray(toy.labels) ? toy.labels.join(', ') : 'No labels'}</p> {/* ✅ תיקון: מניעת קריסה */}
            <p>{toy.inStock ? '✅ In Stock' : '❌ Out of Stock'}</p>
            <button className="back-btn" onClick={() => navigate('/')}>🔙 Back to List</button>
            <button className="chat-btn" onClick={toggleChat}>💬 Chat</button>

            {isChatOpen && (
                <NicePopup onClose={toggleChat} header="Chat" footer="Type your message">
                    <Chat />
                </NicePopup>
            )}
        </section>
    );
}