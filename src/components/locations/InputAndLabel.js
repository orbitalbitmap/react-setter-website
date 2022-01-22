import React from 'react'

const InputAndLabel = (props) => {
  return (
    <>
      <label htmlFor={props.name}>{props.text}:</label>
      <input name={props.name} onChange={props.handleChange} value={props.value} />
    </>
  )
}

export default InputAndLabel