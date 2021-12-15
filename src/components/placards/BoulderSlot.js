import React from 'react'

class BoulderSlot extends React.Component {
  render() {
    return (
      <div className="boulder-slot-grid">
        <div className={`boulder-grades placard-${this.props.color}`}>
          <p className={`boulder-grade-value`}>{this.props.grade}</p>
          <p className={`boulder-arete`}>{this.props.arete}</p>
        </div>
        <div className={`boulder-date-set`}>
          <p className={`boulder-date-value`}>{this.props.dateSet}</p>
        </div>
        <div className={`boulder-setter-name`}>
          <p className={`boulder-setter-value`}>{this.props.setter}</p>
        </div>
      </div>
    )
  }
}

export default BoulderSlot