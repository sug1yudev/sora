// モックユーザーデータ
export const currentUser = {
  id: 'user-me',
  name: '田中 太郎',
  avatar: null,
  email: 'tanaka@sora.app',
  status: 'こんにちは！Soraを使っています 🌤',
};

export const users = [
  { id: 'user-1', name: '佐藤 花子', avatar: null, status: 'お元気で✨', online: true },
  { id: 'user-2', name: '鈴木 一郎', avatar: null, status: '仕事中📱', online: false },
  { id: 'user-3', name: '高橋 美咲', avatar: null, status: '旅行中🗾', online: true },
  { id: 'user-4', name: '渡辺 健太', avatar: null, status: 'コーディング中💻', online: false },
  { id: 'user-5', name: '伊藤 さくら', avatar: null, status: '読書の秋📚', online: true },
  { id: 'user-6', name: '山本 大輔', avatar: null, status: 'ランニング🏃', online: false },
  { id: 'user-7', name: '中村 あかり', avatar: null, status: '☕ カフェでまったり', online: true },
  { id: 'user-8', name: '小林 翔太', avatar: null, status: '音楽聴いてます🎵', online: false },
];

// モックチャットデータ
export const chats = [
  {
    id: 'chat-1',
    participantId: 'user-1',
    lastMessage: '今度の週末、カフェ行かない？',
    lastMessageTime: '14:32',
    unreadCount: 2,
  },
  {
    id: 'chat-2',
    participantId: 'user-2',
    lastMessage: 'プロジェクトの資料送ったよ',
    lastMessageTime: '13:05',
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    participantId: 'user-3',
    lastMessage: '京都の写真見て！最高だった😊',
    lastMessageTime: '昨日',
    unreadCount: 5,
  },
  {
    id: 'chat-4',
    participantId: 'user-4',
    lastMessage: 'あのバグ、もう直した？',
    lastMessageTime: '昨日',
    unreadCount: 0,
  },
  {
    id: 'chat-5',
    participantId: 'user-5',
    lastMessage: 'おすすめの小説ある？',
    lastMessageTime: '月曜',
    unreadCount: 1,
  },
  {
    id: 'chat-6',
    participantId: 'user-7',
    lastMessage: 'ありがとう！また連絡するね',
    lastMessageTime: '月曜',
    unreadCount: 0,
  },
];

// モックメッセージデータ
export const messages = {
  'chat-1': [
    { id: 'm1', senderId: 'user-1', text: 'おはよう！', time: '10:00', date: '今日' },
    { id: 'm2', senderId: 'user-me', text: 'おはよう！元気？', time: '10:02', date: '今日' },
    { id: 'm3', senderId: 'user-1', text: 'うん、元気だよ！最近どう？', time: '10:05', date: '今日' },
    { id: 'm4', senderId: 'user-me', text: '忙しいけど楽しくやってるよ😄', time: '10:07', date: '今日' },
    { id: 'm5', senderId: 'user-1', text: 'よかった！ところで', time: '14:30', date: '今日' },
    { id: 'm6', senderId: 'user-1', text: '今度の週末、カフェ行かない？', time: '14:32', date: '今日' },
  ],
  'chat-2': [
    { id: 'm7', senderId: 'user-me', text: '資料まだ？', time: '12:30', date: '今日' },
    { id: 'm8', senderId: 'user-2', text: 'ごめん、今作ってる', time: '12:45', date: '今日' },
    { id: 'm9', senderId: 'user-2', text: 'プロジェクトの資料送ったよ', time: '13:05', date: '今日' },
  ],
  'chat-3': [
    { id: 'm10', senderId: 'user-3', text: '今、京都に来てるよ！', time: '09:00', date: '昨日' },
    { id: 'm11', senderId: 'user-me', text: 'いいなー！楽しんで！', time: '09:30', date: '昨日' },
    { id: 'm12', senderId: 'user-3', text: '嵐山に行ってきた', time: '15:00', date: '昨日' },
    { id: 'm13', senderId: 'user-3', text: '竹林がすごく綺麗だった', time: '15:01', date: '昨日' },
    { id: 'm14', senderId: 'user-3', text: '京都の写真見て！最高だった😊', time: '18:00', date: '昨日' },
  ],
  'chat-4': [
    { id: 'm15', senderId: 'user-4', text: 'あのバグの件なんだけど', time: '16:00', date: '昨日' },
    { id: 'm16', senderId: 'user-me', text: 'ああ、あれね。見てるよ', time: '16:10', date: '昨日' },
    { id: 'm17', senderId: 'user-4', text: 'あのバグ、もう直した？', time: '16:30', date: '昨日' },
  ],
  'chat-5': [
    { id: 'm18', senderId: 'user-5', text: '最近何か読んだ？', time: '11:00', date: '月曜' },
    { id: 'm19', senderId: 'user-me', text: 'うん、村上春樹の新しいやつ', time: '11:30', date: '月曜' },
    { id: 'm20', senderId: 'user-5', text: 'おすすめの小説ある？', time: '12:00', date: '月曜' },
  ],
  'chat-6': [
    { id: 'm21', senderId: 'user-me', text: '先日はありがとう！', time: '09:00', date: '月曜' },
    { id: 'm22', senderId: 'user-7', text: 'こちらこそ！楽しかったね', time: '09:15', date: '月曜' },
    { id: 'm23', senderId: 'user-7', text: 'ありがとう！また連絡するね', time: '09:20', date: '月曜' },
  ],
};
