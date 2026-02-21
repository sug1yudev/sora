import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // 起動時にトークンがあればユーザー情報を取得
    useEffect(() => {
        const token = api.getToken();
        if (token) {
            api.getMe().then(data => {
                setUser(data.user);
            }).catch(() => {
                api.setToken(null);
            }).finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        setError('');
        try {
            const data = await api.login(email, password);
            api.setToken(data.token);
            setUser(data.user);
            return true;
        } catch (e) {
            setError(e.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signup = useCallback(async (name, email, password) => {
        setIsLoading(true);
        setError('');
        try {
            const data = await api.signup(name, email, password);
            api.setToken(data.token);
            setUser(data.user);
            return true;
        } catch (e) {
            setError(e.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        api.setToken(null);
        setUser(null);
    }, []);

    const updateProfile = useCallback((updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, signup, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
