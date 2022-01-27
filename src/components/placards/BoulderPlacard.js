import React from 'react'

import BoulderSlot from './BoulderSlot'

const BoulderPlacard = (props) => {
  let slotId = 0
  return (
    <div className="boulder-placard-container">
      <div className="boulder-grid-three-column">
        {
          props.climbs.map(climb => {
            slotId++
            return (
              <BoulderSlot
                key={slotId}
                slotId={slotId}
                color={climb.color?.toLowerCase()}
                grade={climb.grade}
                dateSet={climb.dateSet}
                arete={climb.areteMessage}
                setter={climb.setter}
              />
            )
          })
        }
        </div>
        

        <div className="boulder-social-grid">
          <div className="boulder-placard-images">
            <img className="boulder-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="CRG Logo"/>
          </div>
          <div className="boulder-placard-images boulder-social-media">
            <img className="boulder-instagram-logo" src="/images/IG_logo.png" alt="Instagram Logo"/>
            <p className="boulder-insta-handle">@crgworcester</p>
          </div>
        </div>
      </div>
  )
}

export default BoulderPlacard