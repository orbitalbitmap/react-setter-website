import React from 'react'

class DateInput extends React.Component {  
  render() {
    return (
      <input
        className="gray-background date"
        id={this.props.climb.id}
        name="dateSet"
        onChange={this.props.onChange}
        type="date"
        value={this.props.climb.dateSet}
      />
    )
  }
}

export default DateInput