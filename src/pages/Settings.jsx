import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Avatar from '../components/Avatar';
import './Settings.css';

export default function Settings() {
    const { user, logout, updateProfile } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [readReceipts, setReadReceipts] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [editingStatus, setEditingStatus] = useState(false);
    const [statusText, setStatusText] = useState(user?.status || '');

    const handleStatusSave = () => {
        updateProfile({ status: statusText });
        setEditingStatus(false);
    };

    return (
        <div className="settings">
            <header className="settings__header">
                <h1 className="settings__title">設定</h1>
            </header>

            {/* プロフィール */}
            <div className="settings__profile fade-in">
                <Avatar name={user?.name} size={72} />
                <div className="settings__profile-info">
                    <h2 className="settings__profile-name">{user?.name}</h2>
                    <p className="settings__profile-email">{user?.email}</p>
                </div>
            </div>

            {/* ステータス */}
            <section className="settings__section">
                <h3 className="settings__section-title">ステータス</h3>
                <div className="settings__status-row">
                    {editingStatus ? (
                        <div className="settings__status-edit">
                            <input
                                className="settings__status-input"
                                value={statusText}
                                onChange={e => setStatusText(e.target.value)}
                                placeholder="ステータスを入力..."
                                maxLength={50}
                                autoFocus
                            />
                            <button className="settings__status-save" onClick={handleStatusSave}>保存</button>
                            <button className="settings__status-cancel" onClick={() => setEditingStatus(false)}>取消</button>
                        </div>
                    ) : (
                        <button className="settings__item" onClick={() => setEditingStatus(true)}>
                            <span className="settings__item-label">{user?.status || 'ステータスを設定'}</span>
                            <svg className="settings__item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    )}
                </div>
            </section>

            {/* 外観 */}
            <section className="settings__section">
                <h3 className="settings__section-title">外観</h3>
                <button className="settings__item" onClick={toggleTheme} type="button">
                    <div className="settings__item-left">
                        <span className="settings__item-icon">
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                        <span className="settings__item-label">ダークモード</span>
                    </div>
                    <div className={`settings__toggle ${theme === 'dark' ? 'settings__toggle--on' : ''}`}>
                        <div className="settings__toggle-knob" />
                    </div>
                </button>
            </section>

            {/* プライバシー */}
            <section className="settings__section">
                <h3 className="settings__section-title">プライバシー</h3>
                <button className="settings__item" onClick={() => setReadReceipts(!readReceipts)} type="button">
                    <div className="settings__item-left">
                        <span className="settings__item-icon">👁️</span>
                        <div>
                            <span className="settings__item-label">既読通知</span>
                            <span className="settings__item-desc">メッセージの既読を相手に表示</span>
                        </div>
                    </div>
                    <div className={`settings__toggle ${readReceipts ? 'settings__toggle--on' : ''}`}>
                        <div className="settings__toggle-knob" />
                    </div>
                </button>
                <button className="settings__item" onClick={() => setNotifications(!notifications)} type="button">
                    <div className="settings__item-left">
                        <span className="settings__item-icon">🔔</span>
                        <div>
                            <span className="settings__item-label">通知</span>
                            <span className="settings__item-desc">新しいメッセージの通知</span>
                        </div>
                    </div>
                    <div className={`settings__toggle ${notifications ? 'settings__toggle--on' : ''}`}>
                        <div className="settings__toggle-knob" />
                    </div>
                </button>
            </section>


            {/* アプリ情報 */}
            <section className="settings__section">
                <h3 className="settings__section-title">アプリ情報</h3>
                <div className="settings__info">
                    <span>バージョン</span>
                    <span>1.0.0</span>
                </div>
                <div className="settings__info">
                    <span>ライセンス</span>
                    <span>MIT</span>
                </div>
            </section>

            {/* ログアウト */}
            <button className="settings__logout" onClick={logout}>
                ログアウト
            </button>

            <p className="settings__footer">
                Sora — シンプルに、つながる。
            </p>
        </div>
    );
}
