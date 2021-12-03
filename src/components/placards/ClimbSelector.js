import React from 'react'

class ClimbSelector extends React.Component {
  render() {
    return (
      <>
        <label htmlFor={`${this.props.selectorType}1`} >{this.props.labelText}</label>
        <select
          onChange={this.props.handleChange}
          className={`${this.props.selectorType}-selectors-box`}
          name={`${this.props.selectorType}${this.props.slotId}`}
        >
          <option name="climb" value="blank">Blank</option>
          {
            this.props.climbs.length > 0
              ? this.props.climbs.map(climb => {
                return (
                  <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                )
              })
              : null
          }
        </select>
      </>
    )
  }
}

export default ClimbSelector