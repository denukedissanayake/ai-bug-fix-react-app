import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  // VULNERABILITY: URL Injection / Open Redirect
  const handleSearch = () => {
    // VULNERABILITY: No input validation - allows injection attacks
    const encodedQuery = searchQuery;
    
    // VULNERABILITY: Constructing URLs with user input
    const searchUrl = `https://vulnerable-api.com/search?q=${encodedQuery}&redirect=${searchQuery}`;
    
    console.log('Search URL:', searchUrl);
    
    // Simulate fetching results (with vulnerabilities)
    // VULNERABILITY: No CSRF protection
    fetch(searchUrl, {
      method: 'GET',
      // VULNERABILITY: No CORS validation
      mode: 'no-cors',
      credentials: 'include'
    }).catch(err => {
      console.log('Search failed (simulated):', err);
    });

    // VULNERABILITY: Reflected XSS in search results
    setResults([
      { id: 1, title: `Search results for: ${searchQuery}`, url: searchQuery },
      { id: 2, title: 'Click here for more info', url: searchQuery }
    ]);
  };

  // VULNERABILITY: Open redirect function
  const handleRedirect = (url) => {
    // VULNERABILITY: No URL validation before redirect
    console.log('Redirecting to:', url);
    // In a real app: window.location.href = url; (dangerous!)
  };

  return (
    <div className="search-bar">
      <h2>Search</h2>
      
      <div className="search-input">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search (try: javascript:alert('XSS') or http://malicious-site.com)"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          <h3>Results:</h3>
          {results.map(result => (
            <div key={result.id} className="result-item">
              {/* VULNERABILITY: Rendering unsanitized HTML */}
              <div dangerouslySetInnerHTML={{ __html: result.title }} />
              {/* VULNERABILITY: Unsafe link that could redirect anywhere */}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handleRedirect(result.url);
                }}
              >
                Visit: {result.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* VULNERABILITY: IDOR (Insecure Direct Object Reference) simulation */}
      <div className="user-data-access">
        <h3>Access User Data (IDOR Vulnerability)</h3>
        <p>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            // VULNERABILITY: Accessing user data without proper authorization
            const userId = searchQuery || '1';
            console.log(`Accessing user data for ID: ${userId}`);
            console.log(`URL: /api/users/${userId}/private-data`);
          }}>
            View User Profile (ID: {searchQuery || '1'})
          </a>
        </p>
      </div>
    </div>
  );
}

export default SearchBar;
