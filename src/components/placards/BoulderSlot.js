import React from 'react';

function BoulderSlot(props) {
  return (
    <div className="boulder-slot-grid">
      <div className={`boulder-grades placard-${props.color}`}>
        <p className="boulder-grade-value">{props.grade}</p>
        <p className="boulder-arete">{props.arete}</p>
      </div>
      <div className="boulder-date-set">
        <p className="boulder-date-value">{props.dateSet}</p>
      </div>
      <div className="boulder-setter-name">
        <p className="boulder-setter-value">{props.setter}</p>
      </div>
    </div>
  );
}

export default BoulderSlot;
