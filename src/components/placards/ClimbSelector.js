import React from 'react';

function ClimbSelector(props) {
  return (
    <>
      <label htmlFor={`${props.selectorType}1`}>
        {props.labelText}
        {' '}
      </label>
      <select
        onChange={props.handleClimbSelector}
        className={`${props.selectorType}-selectors-box`}
        name={props.name}
      >
        <option name="climb" value="blank">Blank</option>
        {
          props.climbs.map(climb => (
            climb.station
              ? <option key={climb.id} name="climb" value={climb.id}>{`${climb.station}: ${climb.color} ${climb.grade}`}</option>
              : <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
          ))
        }
      </select>
    </>
  );
}

export default ClimbSelector;
