import React, { useState } from 'react';
import './App.css';
import UserProfile from './components/UserProfile';
import CommentSection from './components/CommentSection';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import SearchBar from './components/SearchBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('user');

  // VULNERABILITY: Hardcoded credentials in source code
  const ADMIN_PASSWORD = 'admin123';
  const API_KEY = 'sk-1234567890abcdefghijklmnopqrstuvwxyz';
  const DATABASE_PASSWORD = 'MySecretDBPass2023!';

  const handleLogin = (user, pass, role) => {
    setIsLoggedIn(true);
    setUsername(user);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('user');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vulnerable React App</h1>
        <p className="warning">⚠️ This app contains intentional security vulnerabilities for educational purposes</p>
      </header>

      <main className="App-main">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} adminPassword={ADMIN_PASSWORD} />
        ) : (
          <>
            <div className="user-info">
              <p>Welcome, <strong>{username}</strong>! (Role: {userRole})</p>
              <button onClick={handleLogout}>Logout</button>
            </div>

            <UserProfile username={username} />
            <SearchBar />
            <CommentSection username={username} />
            
            {/* VULNERABILITY: Client-side authorization check only */}
            {userRole === 'admin' && <AdminPanel apiKey={API_KEY} />}
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2023 Vulnerable App - For Security Testing Only</p>
        {/* VULNERABILITY: Exposing sensitive information in comments */}
        {/* Database connection string: mongodb://admin:MySecretDBPass2023!@localhost:27017/vulnerable_db */}
        {/* TODO: Remove API key before production: {API_KEY} */}
      </footer>
    </div>
  );
}

export default App;
