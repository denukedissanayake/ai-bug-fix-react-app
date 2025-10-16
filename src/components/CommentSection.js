import React, { useState } from 'react';
import './CommentSection.css';

function CommentSection({ username }) {
  const [comments, setComments] = useState([
    { id: 1, user: 'Alice', text: 'Great post!', timestamp: new Date().toISOString() },
    { id: 2, user: 'Bob', text: 'Thanks for sharing', timestamp: new Date().toISOString() }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      // VULNERABILITY: No input sanitization
      const comment = {
        id: comments.length + 1,
        user: username,
        text: newComment,
        timestamp: new Date().toISOString()
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      
      // VULNERABILITY: Eval usage with user input
      try {
        // Extremely dangerous: executing user input as code
        const evalResult = eval(newComment);
        console.log('Eval result:', evalResult);
      } catch (e) {
        // Silently fail
      }
    }
  };

  // VULNERABILITY: Using Function constructor (similar to eval)
  const processComment = (text) => {
    try {
      const func = new Function('comment', 'return ' + text);
      return func(text);
    } catch (e) {
      return text;
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment (try: alert('XSS') or console.log(document.cookie))"
          rows="3"
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.user}</strong>
              <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
            </div>
            {/* VULNERABILITY: Rendering unescaped HTML */}
            <div 
              className="comment-text"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
