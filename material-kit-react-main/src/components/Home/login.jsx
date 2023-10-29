  /* eslint-disable */ 
 import React from 'react';

function LoginDialog({ open, onClose }) {
  return (
    <div className={`login-dialog ${open ? 'open' : ''}`}>
      <div className="dialog-content">
        {/* Your login form and content go here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LoginDialog;
