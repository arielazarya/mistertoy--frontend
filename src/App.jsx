import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToyIndex } from './pages/ToyIndex.jsx';
import { ToyDetails } from './pages/ToyDetails.jsx';
import { ToyEdit } from './pages/ToyEdit.jsx';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import './assets/style/cmps/App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const isOnline = useOnlineStatus(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer); 
    }, []);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <h2>🔄 Loading Toys...</h2>
                <div className="loader"></div> 
            </div>
        );
    }

    return (
        <Router>
            <header className="app-header">
                <h1>Toy Store</h1>
                <p className={isOnline ? "online" : "offline"}>
                    {isOnline ? "🟢 Online" : "🔴 Offline"}
                </p>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<ToyIndex />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                    <Route path="/edit/:toyId?" element={<ToyEdit />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;