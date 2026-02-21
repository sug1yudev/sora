import { useState } from 'react';
import './MessageBubble.css';

export default function MessageBubble({ text, imageUrl, time, isMine, showTail = true }) {
    const [lightbox, setLightbox] = useState(false);

    return (
        <>
            <div className={`bubble ${isMine ? 'bubble--mine' : 'bubble--theirs'} ${showTail ? 'bubble--tail' : ''} ${imageUrl ? 'bubble--image' : ''}`}>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="送信画像"
                        className="bubble__image"
                        onClick={() => setLightbox(true)}
                    />
                )}
                {text && <p className="bubble__text">{text}</p>}
                <span className="bubble__time">{time}</span>
            </div>
            {lightbox && (
                <div className="lightbox" onClick={() => setLightbox(false)}>
                    <img src={imageUrl} alt="画像プレビュー" className="lightbox__image" />
                    <button className="lightbox__close" onClick={() => setLightbox(false)}>✕</button>
                </div>
            )}
        </>
    );
}
