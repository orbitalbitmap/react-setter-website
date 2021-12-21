import React from 'react'

class InputAndLabel extends React.Component {
  
  render() {
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.text}:</label>
        <input name={this.props.name} onChange={this.props.handleChange} value={this.props.value} />
      </>
    )
  }
}

export default InputAndLabel