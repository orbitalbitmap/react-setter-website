import React from 'react';

// reimplement this?
function DatabaseError({ erroredOn }) {
  return (
    <h2 className="centered-text">
      <p>{`Sorry there was an error in reaching the database while ${erroredOn}.`}</p>
      <p>Please try again.</p>
    </h2>
  );
}

export default DatabaseError;
