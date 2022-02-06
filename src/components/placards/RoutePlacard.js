import React from 'react'

const RoutePlacard = (props) => {
  return (
    <>
      {
        props.nameList.map(climbName => {
          return (
            <div key={climbName} className={`route-slot-grid placard-${props.climbs[climbName].color?.toLowerCase()}`}>
              <span className="route-grade-value">{props.climbs[climbName].grade}</span>
              <span className="route-name">{props.climbs[climbName].name}</span>
              <span className="route-arete">{props.climbs[climbName].areteMessage}</span>
              <span className="route-placard-info">{props.climbs[climbName].ropeStyle}</span>
              <span className="route-placard-info">{props.climbs[climbName].dateSet}</span>
              <span className="route-placard-info">{props.climbs[climbName].setter}</span>
            </div>
          )
        })
      }
    </>

  )
}

export default RoutePlacard