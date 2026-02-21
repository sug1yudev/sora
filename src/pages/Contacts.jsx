import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import './Contacts.css';

export default function Contacts() {
    const [search, setSearch] = useState('');
    const { startNewChat, users } = useChat();
    const navigate = useNavigate();

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.status.toLowerCase().includes(search.toLowerCase())
    );

    const handleStartChat = async (userId) => {
        const chatId = await startNewChat(userId);
        if (chatId) navigate(`/chat/${chatId}`);
    };

    return (
        <div className="contacts">
            <header className="contacts__header">
                <h1 className="contacts__title">連絡先</h1>
                <span className="contacts__count">{users.length}人</span>
            </header>

            <div className="contacts__search">
                <SearchBar value={search} onChange={setSearch} placeholder="連絡先を検索..." />
            </div>

            <div className="contacts__list">
                {filtered.length === 0 ? (
                    <div className="contacts__empty">
                        <p>連絡先が見つかりません</p>
                    </div>
                ) : (
                    filtered.map((user, i) => (
                        <button
                            key={user.id}
                            className="contacts__item slide-up"
                            style={{ animationDelay: `${i * 40}ms` }}
                            onClick={() => handleStartChat(user.id)}
                        >
                            <Avatar name={user.name} size={48} online={user.online} />
                            <div className="contacts__item-info">
                                <span className="contacts__item-name">{user.name}</span>
                                <span className="contacts__item-status">{user.status}</span>
                            </div>
                            <svg className="contacts__item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
