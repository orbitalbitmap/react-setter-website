import React from 'react'

const AreteSelector = (props) => {
  return (
    <div>
      <label htmlFor={`arete${props.name}`} >Arete: </label>
      <select onChange={props.onChange} name={props.name} default="1">
        <option value="1">None</option>
        <option value="2">On</option>
        <option value="3">Off</option>
      </select>
    </div>
  )
}

export default AreteSelector