import React from 'react';

// reimplement this
function AccessDenied() {
  return (
    <div className="centered-text">
      <h1>Access denied</h1>
      <h3>You do not have the correct permissions for this action.</h3>
      <a href="/dashboard">Go back</a>
    </div>
  );
}

export default AccessDenied;
