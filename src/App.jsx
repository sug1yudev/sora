import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Routes>
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/chats" replace />} />
      </Routes>
      <Routes>
        <Route path="/chat/:chatId" element={null} />
        <Route path="*" element={<Navbar />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
