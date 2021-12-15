import React from 'react'

class RoutePlacard extends React.Component {

  render() {
    return (
      <>
        {
          this.props.nameList
            ? this.props.nameList.map(slotIdNumber => {
              return (
                <div key={slotIdNumber} className={`route-slot-grid placard-${this.props.climbs[slotIdNumber - 1].route.color?.toLowerCase()}`}>
                  <span className="route-grade-value">{this.props.climbs[slotIdNumber - 1].route.grade}</span>
                  <span className="route-name">{this.props.climbs[slotIdNumber - 1].route.name}</span>
                  <span className="route-arete">{this.props.climbs[slotIdNumber - 1].message}</span>
                  <span className="route-placard-info">{this.props.climbs[slotIdNumber - 1].route.ropeStyle}</span>
                  <span className="route-placard-info">{this.props.climbs[slotIdNumber - 1].route.dateSet}</span>
                  <span className="route-placard-info">{this.props.climbs[slotIdNumber - 1].route.setter}</span>
                </div>
              )
            })
            : null
          }
      </>

    )
  }
}

export default RoutePlacard