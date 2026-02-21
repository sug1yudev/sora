import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { api, API_URL } from '../api/client';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [chats, setChats] = useState([]);
    const [allMessages, setAllMessages] = useState({});
    const [users, setUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState({}); // { chatId: userId }
    const socketRef = useRef(null);

    // Socket.io接続
    useEffect(() => {
        const token = api.getToken();
        if (!token) return;

        const socket = io(API_URL, { auth: { token } });
        socketRef.current = socket;

        socket.on('new_message', ({ chatId, message }) => {
            setAllMessages(prev => {
                const existing = prev[chatId] || [];
                if (existing.find(m => m.id === message.id)) return prev;
                return { ...prev, [chatId]: [...existing, message] };
            });
            setChats(prev => prev.map(c =>
                c.id === chatId
                    ? { ...c, lastMessage: message.imageUrl ? '📷 写真' : message.text, lastMessageTime: message.time }
                    : c
            ));
            // メッセージ受信時にtyping表示を消す
            setTypingUsers(prev => {
                const next = { ...prev };
                delete next[chatId];
                return next;
            });
        });

        socket.on('user_online', ({ userId, online }) => {
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, online } : u));
            setChats(prev => prev.map(c => c.participantId === userId ? { ...c, participantOnline: online } : c));
        });

        // 入力中表示
        socket.on('typing', ({ chatId, userId }) => {
            setTypingUsers(prev => ({ ...prev, [chatId]: userId }));
        });
        socket.on('stop_typing', ({ chatId }) => {
            setTypingUsers(prev => {
                const next = { ...prev };
                delete next[chatId];
                return next;
            });
        });

        return () => { socket.disconnect(); };
    }, []);

    // 初期データ取得
    const loadChats = useCallback(async () => {
        try {
            const data = await api.getChats();
            setChats(data.chats);
        } catch (e) { console.error('Failed to load chats:', e); }
    }, []);

    const loadUsers = useCallback(async () => {
        try {
            const data = await api.getUsers();
            setUsers(data.users);
        } catch (e) { console.error('Failed to load users:', e); }
    }, []);

    useEffect(() => {
        if (api.getToken()) {
            loadChats();
            loadUsers();
        }
    }, [loadChats, loadUsers]);

    const getParticipant = useCallback((participantId) => {
        const chat = chats.find(c => c.participantId === participantId);
        if (chat) return { id: chat.participantId, name: chat.participantName, online: chat.participantOnline, status: chat.participantStatus };
        return users.find(u => u.id === participantId);
    }, [chats, users]);

    const getMessages = useCallback(async (chatId) => {
        if (allMessages[chatId]) return allMessages[chatId];
        try {
            const data = await api.getMessages(chatId);
            setAllMessages(prev => ({ ...prev, [chatId]: data.messages }));
            return data.messages;
        } catch { return []; }
    }, [allMessages]);

    const sendMessage = useCallback(async (chatId, text) => {
        try {
            const data = await api.sendMessage(chatId, text, null);
            const msg = data.message;
            setAllMessages(prev => ({
                ...prev,
                [chatId]: [...(prev[chatId] || []), msg],
            }));
            setChats(prev => prev.map(c =>
                c.id === chatId ? { ...c, lastMessage: text, lastMessageTime: msg.time } : c
            ));
            socketRef.current?.emit('send_message', { chatId, message: msg });
            socketRef.current?.emit('stop_typing', { chatId });
        } catch (e) { console.error('Failed to send:', e); }
    }, []);

    const sendImage = useCallback(async (chatId, imageFile) => {
        try {
            let imageUrl;
            if (typeof imageFile === 'string') {
                const res = await fetch(imageFile);
                const blob = await res.blob();
                const file = new File([blob], 'image.jpg', { type: blob.type });
                imageUrl = await api.uploadImage(file);
            } else {
                imageUrl = await api.uploadImage(imageFile);
            }
            const data = await api.sendMessage(chatId, '', imageUrl);
            const msg = data.message;
            setAllMessages(prev => ({
                ...prev,
                [chatId]: [...(prev[chatId] || []), msg],
            }));
            setChats(prev => prev.map(c =>
                c.id === chatId ? { ...c, lastMessage: '📷 写真', lastMessageTime: msg.time } : c
            ));
            socketRef.current?.emit('send_message', { chatId, message: msg });
        } catch (e) { console.error('Failed to send image:', e); }
    }, []);

    const markAsRead = useCallback((chatId) => {
        setChats(prev => prev.map(chat =>
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        ));
    }, []);

    // 入力中イベント送信
    const emitTyping = useCallback((chatId) => {
        socketRef.current?.emit('typing', { chatId });
    }, []);
    const emitStopTyping = useCallback((chatId) => {
        socketRef.current?.emit('stop_typing', { chatId });
    }, []);

    // チャットルーム参加
    const joinChat = useCallback((chatId) => {
        socketRef.current?.emit('join_chat', chatId);
    }, []);

    const startNewChat = useCallback(async (participantId) => {
        const existing = chats.find(c => c.participantId === participantId);
        if (existing) return existing.id;
        try {
            const data = await api.createChat(participantId);
            await loadChats();
            return data.chatId;
        } catch (e) {
            console.error('Failed to create chat:', e);
            return null;
        }
    }, [chats, loadChats]);

    return (
        <ChatContext.Provider value={{
            chats, users, typingUsers,
            getParticipant, getMessages, sendMessage, sendImage,
            markAsRead, startNewChat, loadChats,
            emitTyping, emitStopTyping, joinChat
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChat must be used within ChatProvider');
    return context;
}
