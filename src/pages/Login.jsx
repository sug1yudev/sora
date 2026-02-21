import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
    const { login, signup, isLoading, error: authError } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('メールアドレスとパスワードを入力してください');
            return;
        }
        if (isSignup && !name) {
            setError('名前を入力してください');
            return;
        }

        try {
            let success;
            if (isSignup) {
                success = await signup(name, email, password);
            } else {
                success = await login(email, password);
            }
            if (!success) setError(authError || 'ログインに失敗しました');
        } catch {
            setError('サーバーに接続できません');
        }
    };

    return (
        <div className="login">
            <div className="login__container fade-in">
                {/* ロゴ */}
                <div className="login__brand">
                    <div className="login__logo">
                        <svg viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                            <circle cx="24" cy="16" r="6" fill="currentColor" opacity="0.6" />
                            <path d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
                            <path d="M8 20 Q24 2 40 20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
                        </svg>
                    </div>
                    <h1 className="login__title">Sora</h1>
                    <p className="login__subtitle">シンプルに、つながる。</p>
                </div>

                {/* フォーム */}
                <form className="login__form" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="login__field slide-up">
                            <label className="login__label" htmlFor="name">名前</label>
                            <input
                                id="name"
                                className="login__input"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="田中 太郎"
                                autoComplete="name"
                            />
                        </div>
                    )}
                    <div className="login__field">
                        <label className="login__label" htmlFor="email">メールアドレス</label>
                        <input
                            id="email"
                            className="login__input"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    <div className="login__field">
                        <label className="login__label" htmlFor="password">パスワード</label>
                        <input
                            id="password"
                            className="login__input"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete={isSignup ? 'new-password' : 'current-password'}
                        />
                    </div>

                    {error && <p className="login__error">{error}</p>}

                    <button className="login__button" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <span className="login__spinner" />
                        ) : (
                            isSignup ? 'アカウント作成' : 'ログイン'
                        )}
                    </button>
                </form>

                <div className="login__switch">
                    <span className="login__switch-text">
                        {isSignup ? 'アカウントをお持ちですか？' : 'アカウントをお持ちでないですか？'}
                    </span>
                    <button
                        className="login__switch-btn"
                        onClick={() => { setIsSignup(!isSignup); setError(''); }}
                    >
                        {isSignup ? 'ログイン' : '新規登録'}
                    </button>
                </div>

                <p className="login__hint">
                    デモ: tanaka@sora.app / password
                </p>
            </div>
        </div>
    );
}
