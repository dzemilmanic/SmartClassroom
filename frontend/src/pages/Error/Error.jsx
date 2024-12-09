import React from 'react';
import './Error.css';

function Error() {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="error-btn">Go Home</a>
      </div>
    </div>
  );
}

export default Error;