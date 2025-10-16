import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ username }) {
  const [bio, setBio] = useState('');
  const [displayBio, setDisplayBio] = useState('');

  const handleUpdateBio = () => {
    // VULNERABILITY: XSS (Cross-Site Scripting) - directly rendering user input
    setDisplayBio(bio);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      
      <div className="profile-info">
        <p><strong>Username:</strong> {username}</p>
        
        <div className="bio-section">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio (try entering <script>alert('XSS')</script>)"
            rows="4"
          />
          <button onClick={handleUpdateBio}>Update Bio</button>
        </div>

        {/* VULNERABILITY: dangerouslySetInnerHTML allowing XSS */}
        {displayBio && (
          <div className="bio-display">
            <h3>Your Bio:</h3>
            <div dangerouslySetInnerHTML={{ __html: displayBio }} />
          </div>
        )}
      </div>

      {/* VULNERABILITY: Exposing user data in DOM attributes */}
      <div 
        className="hidden-data" 
        data-user-id="12345"
        data-email="user@example.com"
        data-ssn="123-45-6789"
        data-credit-card="4532-1234-5678-9010"
      >
        {/* Hidden sensitive data in DOM */}
      </div>
    </div>
  );
}

export default UserProfile;
