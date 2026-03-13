import React from 'react';
import { AlertCircle } from 'lucide-react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <AlertCircle className="error-icon" size={64} />
      <h3 className="error-title">Oops! Something went wrong.</h3>
      <p className="error-text">{message || 'An unexpected error occurred.'}</p>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}; 

export default ErrorMessage;
