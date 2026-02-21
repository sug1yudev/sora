import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { api } from '../api/client';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import './Contacts.css';

export default function Contacts() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const { startNewChat, users } = useChat();
    const navigate = useNavigate();

    // サーバー検索（メール/名前）
    useEffect(() => {
        if (search.length < 2) {
            setSearchResults(null);
            return;
        }
        const timer = setTimeout(async () => {
            setSearching(true);
            try {
                const data = await api.searchUsers(search);
                setSearchResults(data.users);
            } catch { setSearchResults(null); }
            setSearching(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const displayUsers = searchResults ?? users;

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
                <SearchBar value={search} onChange={setSearch} placeholder="名前やメールアドレスで検索..." />
            </div>

            {searching && (
                <div className="contacts__searching">
                    <span>検索中...</span>
                </div>
            )}

            <div className="contacts__list">
                {displayUsers.length === 0 ? (
                    <div className="contacts__empty">
                        <p>{search ? '一致するユーザーが見つかりません' : '連絡先がまだありません'}</p>
                        {search && <p className="contacts__hint">メールアドレスで検索してみてください</p>}
                    </div>
                ) : (
                    displayUsers.map((user, i) => (
                        <button
                            key={user.id}
                            className="contacts__item slide-up"
                            style={{ animationDelay: `${i * 40}ms` }}
                            onClick={() => handleStartChat(user.id)}
                        >
                            <Avatar name={user.name} size={48} online={user.online} />
                            <div className="contacts__item-info">
                                <span className="contacts__item-name">{user.name}</span>
                                <span className="contacts__item-status">
                                    {user.email ? user.email : user.status}
                                </span>
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
