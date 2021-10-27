import React from 'react'

const DatabaseError = ({erroredOn}) =>
  <h2 className="centered-text">
    <p>{`Sorry there was an error in reaching the database while ${erroredOn}.`}</p>
    <p>Please try again.</p>
  </h2>


export default DatabaseError
