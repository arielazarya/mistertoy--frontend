import { useEffect } from 'react';
import '../assets/cmps/NicePopup.css'

export function NicePopup({ onClose, header, footer, children }) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <header className="popup-header">
                    <h2>{header}</h2>
                    <button onClick={onClose} className="close-btn">❌</button>
                </header>
                <main className="popup-main">{children}</main>
                <footer className="popup-footer">{footer}</footer>
            </div>
        </div>
    );
}