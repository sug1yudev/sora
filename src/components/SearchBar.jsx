import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = '検索...' }) {
    return (
        <div className="search-bar">
            <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
                className="search-bar__input"
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {value && (
                <button className="search-bar__clear" onClick={() => onChange('')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
}
