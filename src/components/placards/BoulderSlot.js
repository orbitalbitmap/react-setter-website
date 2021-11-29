import React from 'react'

class BoulderSlot extends React.Component {
  render() {
    return (
      <div className="boulder-flex-column-container">
        <div className={`boulder-grades-${this.props.slotId} placard-${this.props.color}`}>
          <p className={`boulder-grade-value-${this.props.slotId}`}>{this.props.grade}</p>
          <p className={`boulder-arete-${this.props.slotId}`}>{this.props.arete}</p>
        </div>
        <div className={`boulder-date-set-${this.props.slotId}`}>
          <p className={`boulder-date-value-${this.props.slotId}`}>{this.props.dateSet}</p>
        </div>
        <div className={`boulder-setter-name-${this.props.slotId}`}>
          <p className={`boulder-setter-value-${this.props.slotId}`}>{this.props.setter}</p>
        </div>
      </div>
    )
  }
}

export default BoulderSlot