import './Avatar.css';

export default function Avatar({ name, size = 44, online = null }) {
    // 名前からイニシャルを取得
    const initials = name
        ? name.split(/\s+/).map(w => w[0]).join('').slice(0, 2)
        : '?';

    // 名前からユニークな色を生成
    const hue = name
        ? name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
        : 200;

    return (
        <div
            className="avatar"
            style={{
                width: size,
                height: size,
                fontSize: size * 0.38,
                background: `linear-gradient(135deg, hsl(${hue}, 45%, 55%), hsl(${(hue + 40) % 360}, 40%, 45%))`,
            }}
        >
            <span className="avatar__initials">{initials}</span>
            {online !== null && (
                <span className={`avatar__status ${online ? 'avatar__status--online' : ''}`} />
            )}
        </div>
    );
}
