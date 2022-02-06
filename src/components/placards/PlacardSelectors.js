import React from 'react'

import ClimbSelector from './ClimbSelector'
import AreteSelector from './AreteSelector'

const ClimbSelectors = (props) => {
  let slotNumber = props.startingSlotNum
  return (
    <>
      <div className={props.class}>
      {
        props.nameList.map(climbName => {
          slotNumber++
          return (
            <div key={climbName} className={`${props.selectorType}-selectors`}>
              <ClimbSelector
                name={climbName}
                labelText={`Slot #${slotNumber}`}
                handleClimbSelector={props.handleClimbSelector}
                climbs={props.distribution} 
                selectorType="boulder"
              />
              
              <AreteSelector 
                name={climbName}
                onChange={props.handleAreteSelector}
              />
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default ClimbSelectors