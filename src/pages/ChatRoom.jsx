import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '../components/Avatar';
import MessageBubble from '../components/MessageBubble';
import './ChatRoom.css';

export default function ChatRoom() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { chats, getParticipant, getMessages, sendMessage, sendImage, markAsRead, typingUsers, emitTyping, emitStopTyping, joinChat } = useChat();
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [msgs, setMsgs] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const isTyping = !!typingUsers[chatId];

    const chat = chats.find(c => c.id === chatId);
    const participant = chat ? getParticipant(chat.participantId) : null;

    // メッセージ取得（非同期）
    useEffect(() => {
        if (chatId) {
            markAsRead(chatId);
            joinChat(chatId);
            getMessages(chatId).then(m => setMsgs(m || []));
        }
    }, [chatId, markAsRead, getMessages, joinChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs]);

    const handleTextChange = (e) => {
        setText(e.target.value);
        emitTyping(chatId);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => emitStopTyping(chatId), 2000);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (imagePreview) {
            sendImage(chatId, imagePreview);
            setImagePreview(null);
            return;
        }
        const trimmed = text.trim();
        if (!trimmed) return;
        sendMessage(chatId, trimmed);
        setText('');
        clearTimeout(typingTimeoutRef.current);
        inputRef.current?.focus();
    };

    const handleImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    if (!chat || !participant) {
        return (
            <div className="chatroom">
                <div className="chatroom__empty">
                    <p>チャットが見つかりません</p>
                    <button onClick={() => navigate('/chats')}>戻る</button>
                </div>
            </div>
        );
    }

    let lastDate = '';

    return (
        <div className="chatroom slide-in-right">
            <header className="chatroom__header">
                <button className="chatroom__back" onClick={() => navigate('/chats')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <Avatar name={participant.name} size={38} online={participant.online} />
                <div className="chatroom__header-info">
                    <h2 className="chatroom__header-name">{participant.name}</h2>
                    <span className={`chatroom__header-status ${participant.online ? 'chatroom__header-status--online' : ''}`}>
                        {isTyping ? '入力中...' : participant.online ? 'オンライン' : 'オフライン'}
                    </span>
                </div>
            </header>

            <div className="chatroom__messages">
                {msgs.map((msg) => {
                    const showDate = msg.date !== lastDate;
                    lastDate = msg.date;
                    const isMine = msg.senderId === user?.id;
                    return (
                        <div key={msg.id} className={`chatroom__msg-row ${isMine ? 'chatroom__msg-row--mine' : 'chatroom__msg-row--theirs'}`}>
                            {showDate && (
                                <div className="chatroom__date-divider">
                                    <span>{msg.date}</span>
                                </div>
                            )}
                            <MessageBubble
                                text={msg.text}
                                imageUrl={msg.imageUrl}
                                time={msg.time}
                                isMine={isMine}
                            />
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {imagePreview && (
                <div className="chatroom__image-preview">
                    <img src={imagePreview} alt="プレビュー" />
                    <button className="chatroom__image-preview-close" onClick={() => setImagePreview(null)}>✕</button>
                </div>
            )}

            <form className="chatroom__input-area" onSubmit={handleSend}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                />
                <button
                    type="button"
                    className="chatroom__attach"
                    onClick={() => fileInputRef.current?.click()}
                    title="画像を送信"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                </button>
                <input
                    ref={inputRef}
                    className="chatroom__input"
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="メッセージを入力..."
                    autoComplete="off"
                />
                <button
                    className={`chatroom__send ${text.trim() || imagePreview ? 'chatroom__send--active' : ''}`}
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
