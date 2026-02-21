# 🌤 Sora — シンプルに、つながる。

プライバシー重視の日本語メッセージアプリ。

## 公開URL

- 🌐 **Web:** https://sora-web-kez8.onrender.com
- 🖥️ **API:** https://sora-server-rka6.onrender.com

## ローカル開発

```bash
# サーバー
cd sora-server && npm install && node server.js  # → :3001

# Web
cd sora && npm install && npm run dev  # → :5173
```

**デモ:** `tanaka@sora.app` / `password`

## 技術スタック

| | 技術 |
|--|------|
| Web | Vite + React |
| Server | Express + Socket.io + SQLite |
| 認証 | JWT + bcrypt |
| リアルタイム | Socket.io |
| デプロイ | Render (Free) |

## セキュリティ

- JWT認証 + チャット認可チェック
- レート制限（ログイン5回/分）
- 入力バリデーション + サニタイズ
- 画像マジックバイト検証
- helmet セキュリティヘッダー
- Socket.io senderId偽装防止

## 変更履歴

### v1.3.0 — 2026-02-21
- 🔍 ユーザー検索（メール/名前）
- ⌨️ 入力中「...」表示
- 🔄 API_URL 開発/本番 自動切り替え

### v1.2.0 — 2026-02-21
- 🔒 セキュリティ全面修正
- 🖥️ バックエンドサーバー構築
- 🔗 フロントエンド接続
- 🖼️ 画像送信機能
- ☁️ Render デプロイ

### v1.1.0 — 2026-02-21
- 📱 React Native モバイル版（iOS + Android）

### v1.0.0 — 2026-02-20
- 🎉 Web版初回リリース

## ライセンス

MIT
