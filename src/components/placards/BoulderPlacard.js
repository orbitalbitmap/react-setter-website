import React from 'react'

import BoulderSlot from './BoulderSlot'

class BoulderPlacard extends React.Component {
  
  
  render() {
    return (
      <div className="placard-container">
        <div className="boulder-three-row-flex">

            <BoulderSlot
              slotId={1}
              color={this.props.climbs[0].boulder1.color?.toLowerCase()}
              grade={this.props.climbs[0].boulder1.grade}
              dateSet={this.props.climbs[0].boulder1.dateSet}
              arete={this.props.climbs[0].message}
              setter={this.props.climbs[0].boulder1.setter}
            />

            <BoulderSlot
              slotId={2}
              color={this.props.climbs[1].boulder2.color?.toLowerCase()}
              grade={this.props.climbs[1].boulder2.grade}
              dateSet={this.props.climbs[1].boulder2.dateSet}
              arete={this.props.climbs[1].message}
              setter={this.props.climbs[1].boulder2.setter}
            />

            <BoulderSlot
              slotId={3}
              color={this.props.climbs[2].boulder3.color?.toLowerCase()}
              grade={this.props.climbs[2].boulder3.grade}
              dateSet={this.props.climbs[2].boulder3.dateSet}
              arete={this.props.climbs[2].message}
              setter={this.props.climbs[2].boulder3.setter}
            />
          </div>
          

            <div className="boulder-flex-images-container">
              <div className="boulder-placard-images">
                <img className="boulder-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="CRG Logo"/>
              </div>
              <div className="boulder-placard-images boulder-flex-row-container">
                <img className="boulder-instagram-logo" src="/images/IG_logo.png" alt="Instagram Logo"/>
                <p className="boulder-insta-handle">@crgworcester</p>
              </div>
            </div>
          {/* </div> */}
        </div>
    )
  }
}

export default BoulderPlacard