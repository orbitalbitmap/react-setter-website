import React from 'react'

import ClimbSelector from './ClimbSelector'
import AreteSelector from './AreteSelector'

class ClimbSelectors extends React.Component {
  render() {
    return (
      <>
        <div className={this.props.className}>
          <div className={`${this.props.selectorType}-selectors`}>
            <ClimbSelector
              labelText={`Slot #${this.props.nameList[0]}`}
              handleChange={this.props.handleChange}
              climbs={this.props.climbs} 
              selectorType={this.props.selectorType}
              slotId={this.props.nameList[0]}
            />
            
              <AreteSelector 
                name={`arete${this.props.nameList[0]}`}
                onChange={this.props.handleAreteSelect}
              />
          </div>

          <div className={`${this.props.selectorType}-selectors`}>
            <ClimbSelector
              labelText={`Slot #${this.props.nameList[1]}`}
              handleChange={this.props.handleChange}
              climbs={this.props.climbs} 
              selectorType={this.props.selectorType}
              slotId={this.props.nameList[1]}
            />

              <AreteSelector 
                name={`arete${this.props.nameList[1]}`}
                onChange={this.props.handleAreteSelect}
              />
          </div>

          <div className={`${this.props.selectorType}-selectors`}>
            <ClimbSelector
              labelText={`Slot #${this.props.nameList[2]}`}
              handleChange={this.props.handleChange}
              climbs={this.props.climbs} 
              selectorType={this.props.selectorType}
              slotId={this.props.nameList[2]}
            />

              <AreteSelector 
                name={`arete${this.props.nameList[0]}`}
                onChange={this.props.handleAreteSelect}
              />
          </div>
        </div>
      </>
    )
  }
}

export default ClimbSelectors