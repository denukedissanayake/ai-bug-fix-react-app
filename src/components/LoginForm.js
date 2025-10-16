import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin, adminPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // VULNERABILITY: Client-side authentication only
    // No server-side validation
    if (username && password) {
      let role = 'user';
      
      // VULNERABILITY: Hardcoded password check on client-side
      if (username === 'admin' && password === adminPassword) {
        role = 'admin';
      }
      
      // VULNERABILITY: Storing sensitive data in localStorage (plain text)
      localStorage.setItem('user', username);
      localStorage.setItem('password', password);
      localStorage.setItem('role', role);
      localStorage.setItem('sessionToken', btoa(username + ':' + password));
      
      onLogin(username, password, role);
    } else {
      setError('Please enter both username and password');
    }
  };

  // VULNERABILITY: SQL Injection vulnerability simulation
  const checkUserInDatabase = (user) => {
    // Simulating a SQL query construction (dangerous in real scenarios)
    const query = "SELECT * FROM users WHERE username = '" + user + "'";
    console.log('Executing query:', query);
    // In a real app, this would be sent to a backend
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // VULNERABILITY: Executing queries based on user input
    if (value.length > 3) {
      checkUserInDatabase(value);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            // VULNERABILITY: Password visible in browser autocomplete
            autoComplete="on"
          />
        </div>

        <button type="submit">Login</button>

        <div className="hint">
          {/* VULNERABILITY: Exposing credentials in UI */}
          <small>Hint: Try admin/{adminPassword} for admin access</small>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
