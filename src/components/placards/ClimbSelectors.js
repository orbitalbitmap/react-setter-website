import React from 'react'

class ClimbSelectors extends React.Component {


  render() {
    return (
      <>
        <div className={this.props.className}>
          <div className={`${this.props.selectorType}-selectors`}>
            <span>Left:</span>
            <select onChange={this.props.handleChange} className={`${this.props.selectorType}-selectors-top`} name={`boulder${this.props.nameList[0]}`}>
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
            <div>
              <label htmlFor={`arete${this.props.nameList[0]}`} >Arete:</label>
              <select onChange={this.props.handleAreteSelect} name={`arete${this.props.nameList[0]}`} default="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>

          <div className={`${this.props.selectorType}-selectors`}>
            <span>Middle:</span>
            <select onChange={this.props.handleChange} className={`${this.props.selectorType}-selectors-middle`} name={`boulder${this.props.nameList[1]}`}>
              <option name="climb" value="blank">Blank</option>
              {
                this.props.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor={`arete${this.props.nameList[1]}`}>Arete:</label>
              <select onChange={this.props.handleAreteSelect} name={`arete${this.props.nameList[1]}`} defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>

          <div className={`${this.props.selectorType}-selectors`}>
            <span>Right:</span>
            <select onChange={this.props.handleChange} className={`${this.props.selectorType}-selectors-bottom`} name={`boulder${this.props.nameList[2]}`}>
              <option name="climb" value="blank">Blank</option>
              {
                this.props.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor={`arete${this.props.nameList[2]}`}>Arete:</label>
              <select onChange={this.props.handleAreteSelect} name={`arete${this.props.nameList[2]}`} defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ClimbSelectors