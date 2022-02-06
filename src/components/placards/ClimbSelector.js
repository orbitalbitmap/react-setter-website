import React from 'react'

const ClimbSelector = (props) => {
  return (
    <>
      <label htmlFor={`${props.selectorType}1`}>{props.labelText} </label>
      <select
        onChange={props.handleClimbSelector}
        className={`${props.selectorType}-selectors-box`}
        name={props.name}
      >
        <option name="climb" value="blank">Blank</option>
        {
          props.climbs.map(climb => {
            return (
              <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
            )
          })
        }
      </select>
    </>
  )
}

export default ClimbSelector