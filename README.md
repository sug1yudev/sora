# 🌤 Sora — シンプルに、つながる。

LINEの複雑さ・広告・プライバシー懸念に疲れた日本のユーザーのための、**シンプル・高速・プライバシー重視**のメッセージアプリです。

## 対応プラットフォーム

| プラットフォーム | 技術 | 状態 |
|----------------|------|------|
| 🌐 Web | Vite + React | ✅ 動作確認済み |
| 🍎 iOS | React Native 0.84 | ✅ シミュレーター動作確認済み |
| 🤖 Android | React Native 0.84 | ✅ エミュレーター動作確認済み |
| 🖥️ サーバー | Node.js + Express + Socket.io | ✅ ローカル動作確認済み |

## セットアップ

### 1. サーバー起動（先に起動）

```bash
cd sora-server
npm install
node server.js
# → http://localhost:3001
```

### 2. Web版

```bash
cd sora
npm install
npm run dev
# → http://localhost:5173
```

**デモログイン:** `tanaka@sora.app` / `password`

### 3. モバイル版（iOS / Android）

```bash
cd SoraMobile
npm install

# iOS
cd ios && bundle install && bundle exec pod install && cd ..
npx react-native run-ios --simulator="iPhone 16e"

# Android
npx react-native run-android
```

## 技術スタック

| カテゴリ | Web版 | モバイル版 | サーバー |
|---------|-------|-----------|---------|
| フレームワーク | Vite + React | React Native 0.84 | Express.js |
| 言語 | JavaScript | TypeScript | JavaScript |
| リアルタイム | Socket.io Client | — | Socket.io |
| DB | — | — | SQLite |
| 認証 | JWT (localStorage) | — | JWT + bcrypt |
| 画像 | FileReader + Upload | — | multer |

## API エンドポイント

| Method | Endpoint | 説明 |
|--------|----------|------|
| POST | `/api/auth/signup` | ユーザー登録 |
| POST | `/api/auth/login` | ログイン → JWT返却 |
| GET | `/api/auth/me` | 現在のユーザー情報 |
| GET | `/api/chats` | チャット一覧 |
| GET | `/api/chats/:id/messages` | メッセージ取得 |
| POST | `/api/chats/:id/messages` | メッセージ送信 |
| POST | `/api/chats` | 新規チャット作成 |
| GET | `/api/users` | ユーザー一覧 |
| POST | `/api/upload` | 画像アップロード |

## プロジェクト構成

```
Program/
├── sora/                    # Web版 (Vite + React)
│   ├── src/
│   │   ├── api/             # APIクライアント
│   │   ├── components/      # Avatar, MessageBubble, Navbar, SearchBar
│   │   ├── contexts/        # Auth, Chat, Theme (API + Socket.io接続)
│   │   ├── pages/           # Login, ChatList, ChatRoom, Contacts, Settings
│   │   └── index.css        # デザインシステム
│   └── README.md
│
├── sora-server/             # バックエンド (Node.js)
│   ├── server.js            # エントリーポイント
│   ├── db/                  # SQLite + seed
│   ├── middleware/           # JWT認証
│   ├── routes/              # auth, chats, users, upload
│   ├── socket/              # Socket.ioハンドラー
│   └── uploads/             # 画像保存
│
└── SoraMobile/              # モバイル版 (React Native)
    ├── App.tsx
    ├── src/
    │   ├── screens/         # 全5画面
    │   ├── contexts/        # Auth, Chat, Theme (TypeScript)
    │   └── theme/           # デザイントークン
    ├── ios/
    └── android/
```

---

## 変更履歴

### v1.2.0 — 2026-02-21
- 🖥️ **バックエンドサーバー構築**
  - Node.js + Express + Socket.io + SQLite
  - JWT認証（signup/login）
  - REST API（チャット・メッセージ・ユーザー）
  - Socket.ioリアルタイムメッセージ配信
  - 画像アップロード（multer）
- 🔗 **フロントエンド接続** — モックデータからリアルAPI通信へ移行
- 🖼️ **画像送信機能** — プレビュー・ライトボックス・サーバーアップロード

### v1.1.0 — 2026-02-21
- 📱 React Native モバイル版（iOS + Android）
- 💬 メッセージUI改善（左右配置）

### v1.0.0 — 2026-02-20
- 🎉 Web版 初回リリース

---

## ロードマップ

- [x] 🌐 Web版
- [x] 📱 iOS / Android（React Native）
- [x] 🖥️ バックエンドサーバー
- [x] 🖼️ 画像送信
- [ ] ☁️ クラウドデプロイ（Render）
- [ ] 🔒 E2E暗号化
- [ ] 📲 PWA化

## ライセンス

MIT
