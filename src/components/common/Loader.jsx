import React from 'react';
import { Loader2 } from 'lucide-react';
import './Loader.css';

const Loader = ({ fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'fullscreen' : ''}`}>
      <Loader2 className="spinner" size={48} />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
