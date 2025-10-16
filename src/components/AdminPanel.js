import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ apiKey }) {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  // VULNERABILITY: Command injection - executing arbitrary commands
  const executeCommand = () => {
    // Simulating command execution (in a real scenario, this would be extremely dangerous)
    console.log('Executing command:', command);
    
    // VULNERABILITY: No validation of command input
    const simulatedOutput = `Executing: ${command}\n` +
      `API Key in use: ${apiKey}\n` +
      `System: Command would be executed on server\n` +
      `Warning: This is a security vulnerability!`;
    
    setOutput(simulatedOutput);

    // VULNERABILITY: Storing sensitive logs in browser console
    console.log('API Key:', apiKey);
    console.log('Admin command executed:', command);
  };

  // VULNERABILITY: Exposing API endpoints and internal structure
  const apiEndpoints = {
    users: 'http://api.vulnerable-app.com/users',
    admin: 'http://api.vulnerable-app.com/admin/delete-all',
    database: 'http://internal-db.vulnerable-app.com:27017',
    secrets: 'http://api.vulnerable-app.com/secrets/tokens'
  };

  return (
    <div className="admin-panel">
      <h2>⚠️ Admin Panel</h2>
      <p className="admin-warning">Authorized access only</p>

      {/* VULNERABILITY: Exposing API key in the UI */}
      <div className="api-info">
        <p><strong>API Key:</strong> <code>{apiKey}</code></p>
        <p><strong>Environment:</strong> Production</p>
      </div>

      <div className="command-section">
        <h3>Execute System Command</h3>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command (e.g., rm -rf / or DROP TABLE users)"
        />
        <button onClick={executeCommand}>Execute</button>
      </div>

      {output && (
        <div className="output">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}

      {/* VULNERABILITY: Exposing internal API endpoints */}
      <div className="api-endpoints">
        <h3>Internal API Endpoints</h3>
        <ul>
          {Object.entries(apiEndpoints).map(([key, url]) => (
            <li key={key}>
              <strong>{key}:</strong> <code>{url}</code>
            </li>
          ))}
        </ul>
      </div>

      {/* VULNERABILITY: Debug info exposure */}
      <div className="debug-info">
        <h3>Debug Information</h3>
        <pre>
          {JSON.stringify({
            apiKey: apiKey,
            dbPassword: 'MySecretDBPass2023!',
            jwtSecret: 'super-secret-jwt-key-12345',
            awsAccessKey: 'AKIAIOSFODNN7EXAMPLE',
            awsSecretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default AdminPanel;
