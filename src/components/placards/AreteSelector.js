import React from 'react'

// set font size to 1.75rem


class AreteSelector extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor={`arete${this.props.name}`} >Arete:</label>
        <select onChange={this.props.onChange} name={this.props.name} default="1">
          <option value="1">None</option>
          <option value="2">On</option>
          <option value="3">Off</option>
        </select>
      </div>
    )
  }
}

export default AreteSelector