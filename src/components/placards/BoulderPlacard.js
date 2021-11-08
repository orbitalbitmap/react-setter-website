import React from 'react'

class BoulderPlacard extends React.Component {
  
  
  render() {
    return (
      <div className="placard-container">
          <div className="boulder-three-row-flex">
            
            {/* REFACTOR TO USE COLUMN LAYOUT INSTEAD OF ROW */}

            <div className="boulder-flex-column-container">
              <div className={`boulder-grades-1 placard-${this.props.climbs[0].boulder1.color?.toLowerCase()}`}>
                <p className="boulder-grade-value-1">{this.props.climbs[0].boulder1.grade}</p>
                <p className="boulder-arete-1">{this.props.climbs[0].message}</p>
              </div>
              <div className="boulder-date-set-1">
                <p className="boulder-date-value-1">{this.props.climbs[0].boulder1.dateSet}</p>
              </div>
              <div className="boulder-setter-name-1">
                <p className="boulder-setter-value-1">{this.props.climbs[0].boulder1.setter}</p>
              </div>
            </div>

            <div className="boulder-flex-column-container">
              <div className={`boulder-grades-2 placard-${this.props.climbs[1].boulder2.color?.toLowerCase()}`}>
                <p className="boulder-grade-value-2">{this.props.climbs[1].boulder2.grade}</p>
                <p className="boulder-arete-2">{this.props.climbs[1].message}</p>
              </div>
              <div className="boulder-date-set-2">
                <p className="boulder-date-value-2">{this.props.climbs[1].boulder2.dateSet}</p>
              </div>
              <div className="boulder-setter-name-2">
                <p className="boulder-setter-value-2">{this.props.climbs[1].boulder2.setter}</p>
              </div>
            </div>

            <div className="boulder-flex-column-container">
              <div className={`boulder-grades-3 placard-${this.props.climbs[2].boulder3.color?.toLowerCase()}`}>
                <p className="boulder-grade-value-3">{this.props.climbs[2].boulder3.grade}</p>
                <p className="boulder-arete-3">{this.props.climbs[2].message}</p>
              </div>
              <div className="boulder-date-set-3">
                <p className="boulder-date-value-3">{this.props.climbs[2].boulder3.dateSet}</p>
              </div>
              <div className="boulder-setter-name-3">
                <p className="boulder-setter-value-3">{this.props.climbs[2].boulder3.setter}</p>
              </div>
            </div>
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