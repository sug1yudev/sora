// ローカル開発時: const API_URL = 'http://localhost:3001';
const API_URL = 'https://sora-server-rka6.onrender.com';

class ApiClient {
    constructor() {
        this.token = localStorage.getItem('sora_token');
    }

    setToken(token) {
        this.token = token;
        if (token) localStorage.setItem('sora_token', token);
        else localStorage.removeItem('sora_token');
    }

    getToken() {
        return this.token;
    }

    async request(path, options = {}) {
        const headers = { 'Content-Type': 'application/json', ...options.headers };
        if (this.token) headers.Authorization = `Bearer ${this.token}`;

        const res = await fetch(`${API_URL}${path}`, { ...options, headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'リクエストに失敗しました');
        return data;
    }

    // 認証
    login(email, password) { return this.request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); }
    signup(name, email, password) { return this.request('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }); }
    getMe() { return this.request('/api/auth/me'); }

    // チャット
    getChats() { return this.request('/api/chats'); }
    getMessages(chatId) { return this.request(`/api/chats/${chatId}/messages`); }
    sendMessage(chatId, text, imageUrl) { return this.request(`/api/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify({ text, imageUrl }) }); }
    createChat(participantId) { return this.request('/api/chats', { method: 'POST', body: JSON.stringify({ participantId }) }); }

    // ユーザー
    getUsers() { return this.request('/api/users'); }

    // 画像アップロード
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${this.token}` },
            body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'アップロード失敗');
        return `${API_URL}${data.imageUrl}`;
    }
}

export const api = new ApiClient();
export { API_URL };
