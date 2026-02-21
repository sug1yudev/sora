import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import './ChatList.css';

export default function ChatList() {
    const { chats, getParticipant } = useChat();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filtered = chats.filter(chat => {
        const p = getParticipant(chat.participantId);
        if (!p) return false;
        return p.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="chatlist">
            <header className="chatlist__header">
                <h1 className="chatlist__title">チャット</h1>
            </header>

            <div className="chatlist__search">
                <SearchBar value={search} onChange={setSearch} placeholder="名前やメッセージで検索..." />
            </div>

            <div className="chatlist__list">
                {filtered.length === 0 ? (
                    <div className="chatlist__empty">
                        <p>チャットが見つかりません</p>
                    </div>
                ) : (
                    filtered.map((chat, i) => {
                        const participant = getParticipant(chat.participantId);
                        if (!participant) return null;

                        return (
                            <button
                                key={chat.id}
                                className="chatlist__item slide-up"
                                style={{ animationDelay: `${i * 40}ms` }}
                                onClick={() => navigate(`/chat/${chat.id}`)}
                            >
                                <Avatar name={participant.name} size={50} online={participant.online} />
                                <div className="chatlist__item-content">
                                    <div className="chatlist__item-top">
                                        <span className="chatlist__item-name">{participant.name}</span>
                                        <span className="chatlist__item-time">{chat.lastMessageTime}</span>
                                    </div>
                                    <div className="chatlist__item-bottom">
                                        <p className="chatlist__item-message">{chat.lastMessage}</p>
                                        {chat.unreadCount > 0 && (
                                            <span className="chatlist__item-badge">{chat.unreadCount}</span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}
