import React from 'react'

class RoutePlacard extends React.Component {

  render() {
    console.log(this.props.nameList)
    return (
      <div className="placard-container" style={{left: '20rem', position: 'absolute'}}>
        <div className="route-three-column-flex">
          <div className="route-flex-row-container route-info-container">
            {
              this.props.nameList
                ? this.props.nameList.map(slotIdNumber => {
                  console.log(this.props.climbs[slotIdNumber - 1])
                  return (
                    <div key={slotIdNumber} id={`slot${slotIdNumber}`} className={`route-grades placard-${this.props.climbs[slotIdNumber - 1].route.color?.toLowerCase()}`}>
                      <p className="route-grade-value">{this.props.climbs[slotIdNumber - 1].route.grade}</p>
                      <p className="route-name">{this.props.climbs[slotIdNumber - 1].route.name}</p>
                      <p className="route-arete-info">{this.props.climbs[slotIdNumber - 1].message}</p>
                      <div className="route-info-container">
                        <p className="route-placard-info">{this.props.climbs[slotIdNumber - 1].route.ropeStyle}</p>
                        <p className="route-placard-info">{this.props.climbs[slotIdNumber - 1].route.dateSet}</p>
                        <p className="route-placard-info">{this.props.climbs[slotIdNumber - 1].route.setter}</p>
                      </div>
                    </div>
                  )
                })
                : null
              }
            </div>
          </div>
          
          <div className="route-flex-images-container">
            <div className="route-placard-images">
              <img className="route-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="Central Rock Gym logo" />
            </div>
            <div className="route-placard-images social-mdeia-flex-container">
              {/* //width: 4.375rem; */}
              <div>
                <img className="route-instagram-logo" src="/images/Facebook_logo.png" alt="Facbook logo"/>
                <p className="route-insta-handle centere>text">Central Rock Worcester</p>
              </div>
              <div>
                <img className="route-instagram-logo" src="/images/Twitter_colored_logo.png" alt="Twitter logo"/>
                <p className="route-insta-handle">@crgworcester</p>
              </div>
              <div>
                <img className="route-instagram-logo" src="/images/IG_logo.png" alt="Instagram logo"/>
                <p className="route-insta-handle">@crgworcester</p>
              </div>
            </div>
          </div>
        </div>

    )
  }
}

export default RoutePlacard