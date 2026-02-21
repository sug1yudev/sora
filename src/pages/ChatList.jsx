import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { api } from '../api/client';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import './ChatList.css';

export default function ChatList() {
    const { chats, getParticipant, startNewChat } = useChat();
    const [search, setSearch] = useState('');
    const [showNewChat, setShowNewChat] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const filtered = chats.filter(chat => {
        const p = getParticipant(chat.participantId);
        if (!p) return false;
        return p.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase());
    });

    // ユーザー検索
    useEffect(() => {
        if (userSearch.length < 2) { setSearchResults([]); return; }
        const timer = setTimeout(async () => {
            setSearching(true);
            try {
                const data = await api.searchUsers(userSearch);
                setSearchResults(data.users);
            } catch { setSearchResults([]); }
            setSearching(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [userSearch]);

    // モーダル外クリックで閉じる
    useEffect(() => {
        if (!showNewChat) return;
        const handleClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowNewChat(false);
                setUserSearch('');
                setSearchResults([]);
            }
        };
        setTimeout(() => document.addEventListener('click', handleClick), 0);
        return () => document.removeEventListener('click', handleClick);
    }, [showNewChat]);

    const handleSelectUser = async (userId) => {
        setShowNewChat(false);
        setUserSearch('');
        setSearchResults([]);
        const chatId = await startNewChat(userId);
        if (chatId) navigate(`/chat/${chatId}`);
    };

    return (
        <div className="chatlist">
            <header className="chatlist__header">
                <h1 className="chatlist__title">チャット</h1>
                <button
                    className="chatlist__new-btn"
                    onClick={() => setShowNewChat(true)}
                    title="新しいチャット"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <line x1="12" y1="8" x2="12" y2="14" />
                        <line x1="9" y1="11" x2="15" y2="11" />
                    </svg>
                </button>
            </header>

            {/* 新規チャットモーダル */}
            {showNewChat && (
                <div className="chatlist__modal-overlay">
                    <div className="chatlist__modal" ref={modalRef}>
                        <div className="chatlist__modal-header">
                            <h2>新しいチャット</h2>
                            <button className="chatlist__modal-close" onClick={() => { setShowNewChat(false); setUserSearch(''); }}>✕</button>
                        </div>
                        <div className="chatlist__modal-search">
                            <input
                                type="text"
                                value={userSearch}
                                onChange={e => setUserSearch(e.target.value)}
                                placeholder="名前やメールアドレスで検索..."
                                autoFocus
                                className="chatlist__modal-input"
                            />
                        </div>
                        <div className="chatlist__modal-results">
                            {searching && <p className="chatlist__modal-status">検索中...</p>}
                            {!searching && userSearch.length >= 2 && searchResults.length === 0 && (
                                <p className="chatlist__modal-status">ユーザーが見つかりません</p>
                            )}
                            {userSearch.length < 2 && (
                                <p className="chatlist__modal-status">名前かメールアドレスを入力してください</p>
                            )}
                            {searchResults.map(user => (
                                <button
                                    key={user.id}
                                    className="chatlist__modal-user"
                                    onClick={() => handleSelectUser(user.id)}
                                >
                                    <Avatar name={user.name} size={40} online={user.online} />
                                    <div className="chatlist__modal-user-info">
                                        <span className="chatlist__modal-user-name">{user.name}</span>
                                        <span className="chatlist__modal-user-email">{user.email}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="chatlist__search">
                <SearchBar value={search} onChange={setSearch} placeholder="名前やメッセージで検索..." />
            </div>

            <div className="chatlist__list">
                {filtered.length === 0 ? (
                    <div className="chatlist__empty">
                        <p>チャットがまだありません</p>
                        <button className="chatlist__empty-btn" onClick={() => setShowNewChat(true)}>
                            ＋ 新しいチャットを始める
                        </button>
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
