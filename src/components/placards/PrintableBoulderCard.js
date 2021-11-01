import React from 'react'
import axios from 'axios'

class PrintableBoulderCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      boulder1: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      boulder2: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      boulder3: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      boulder4: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      boulder5: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      boulder6: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      arete1: null,
      arete2: null,
      arete3: null,
      arete4: null,
      arete5: null,
      arete6: null,
      climbs: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAreteSelect = this.handleAreteSelect.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/currentBoulderGrades/1') 

    this.setState({
      climbs: data
    })
  }

  async handleChange(event) {
    const selectedClimb = this.state.climbs[event.target.value -1]

    if(event.target.value === 'blank') {
      await this.setState({
        [event.target.name]: {
          grade: null,
          color: null, 
          dateSet: null,
          setter: null,
        }
      })
    } else {
      await this.setState({
        [event.target.name]: {
          grade: selectedClimb.grade,
          color: selectedClimb.color, 
          dateSet: selectedClimb.dateSet,
          setter: selectedClimb.setter,
        }
      })
    }
  }

  handleAreteSelect(event) {
    switch (event.target.value) {
      case "2":
        this.setState({
          [event.target.name]: "Arete is on"
        })
        break
        case "3":
          this.setState({
            [event.target.name]: "Arete is off"
          })
          break
      default:
        this.setState({
          [event.target.name]: null
        })
    }
  }

  render() {
    return (
      <>
        <div className="noprint selection-container-top">
          <div className="boulder-selectors">
            <span>Left:</span>
            <select onChange={this.handleChange} className="boulder-selectors-top" name="boulder1">
              <option name="climb" value="blank">Blank</option>
              {
                this.state.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor="arete1">Arete:</label>
              <select onChange={this.handleAreteSelect} name="arete1" default="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>

          <div className="boulder-selectors boulder-selector-2">
            <span>Middle:</span>
            <select onChange={this.handleChange} className="boulder-selectors-middle" name="boulder2">
              <option name="climb" value="blank">Blank</option>
              {
                this.state.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor="arete2">Arete:</label>
              <select onChange={this.handleAreteSelect} name="arete2" defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>

          <div className="boulder-selectors boulder-selector-3">
            <span>Right:</span>
            <select onChange={this.handleChange} className="boulder-selectors-bottom" name="boulder3">
              <option name="climb" value="blank">Blank</option>
              {
                this.state.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor="arete3">Arete:</label>
              <select onChange={this.handleAreteSelect} name="arete3" defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>
        </div>

        <div className="placard-container">
          <div className="boulder-three-column-flex">
            <div className="boulder-flex-row-container">
              <div className="boulder-grades">
                <p className="boulder-grade-value boulder1" style={{color: this.state.boulder1.color}}>{this.state.boulder1.grade}</p>
                <p className="boulder-arete boulder1">{this.state.arete1}</p>
              </div>
              <div className="boulder-grades">
                <p className="boulder-grade-value boulder2" style={{color: this.state.boulder2.color}}>{this.state.boulder2.grade}</p>
                <p className="boulder-arete boulder2">{this.state.arete2}</p>
              </div>
              <div className="boulder-grades">
                <p className="boulder-grade-value boulder3" style={{color: this.state.boulder3.color}}>{this.state.boulder3.grade}</p>
                <p className="boulder-arete boulder3">{this.state.arete3}</p>
              </div>
            </div>

            <div className="boulder-flex-row-container">
              <div className="boulder-date-set">
                <p className="boulder-date-value boulder1">{this.state.boulder1.dateSet}</p>
              </div>
              <div className="boulder-date-set">
                <p className="boulder-date-value boulder2">{this.state.boulder2.dateSet}</p>
              </div>
              <div className="boulder-date-set">
                <p className="boulder-date-value boulder3">{this.state.boulder3.dateSet}</p>
              </div>
            </div>

            <div className="boulder-flex-row-container">
              <div className="boulder-setter-name">
                <p className="boulder-setter-value boulder1">{this.state.boulder1.setter}</p>
              </div>
              <div className="boulder-setter-name">
                <p className="boulder-setter-value boulder2">{this.state.boulder2.setter}</p>
              </div>
              <div className="boulder-setter-name">
                <p className="boulder-setter-value boulder3">{this.state.boulder3.setter}</p>
              </div>
            </div>

            <div className="boulder-flex-row-container">
              <div className="boulder-placard-images">
                <img className="boulder-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="CRG Logo"/>
              </div>
              <div className="boulder-placard-images boulder-flex-row-container">
                <img className="boulder-instagram-logo" src="/images/IG_logo.png" alt="Instagram Logo"/>
                <p className="boulder-insta-handle">@crgworcester</p>
              </div>
            </div>
          </div>
        </div>

        <div className="noprint selection-container-bottom">
          <div className="boulder-selectors">
            <span>Left:</span>
            <select onChange={this.handleChange} className="boulder-selectors-top" name="boulder4">
              <option name="climb" value="blank">Blank</option>
              {
                this.state.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor="arete4">Arete:</label>
              <select onChange={this.handleAreteSelect} name="arete4" defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>

          <div className="boulder-selectors">
            <span>Middle:</span>
            <select onChange={this.handleChange} className="boulder-selectors-middle" name="boulder5">
              <option name="climb" value="blank">Blank</option>
              {
                this.state.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor="arete5">Arete:</label>
              <select onChange={this.handleAreteSelect} name="arete5" defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>

          <div className="boulder-selectors">
            <span>Right:</span>
            <select onChange={this.handleChange} className="boulder-selectors-bottom" name="boulder6">
              <option name="climb" value="blank">Blank</option>
              {
                this.state.climbs.map(climb => {
                  return (
                    <option key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</option>
                  )
                })
              }
            </select>
            <div>
              <label htmlFor="arete6">Arete:</label>
              <select onChange={this.handleAreteSelect} name="arete6" defaultValue="1">
                <option value="1">None</option>
                <option value="2">On</option>
                <option value="3">Off</option>
              </select>
            </div>
          </div>
        </div>

        <div className="placard-container">
          <div className="boulder-three-column-flex">
            <div className="boulder-flex-row-container">
              <div className="boulder-grades">
                <p className="boulder-grade-value boulder4" style={{color: this.state.boulder4.color}}>{this.state.boulder4.grade}</p>
                <p className="boulder-arete boulder4">{this.state.arete4}</p>
              </div>
              <div className="boulder-grades">
                <p className="boulder-grade-value boulder5" style={{color: this.state.boulder5.color}}>{this.state.boulder5.grade}</p>
                <p className="boulder-arete boulder5">{this.state.arete5}</p>
              </div>
              <div className="boulder-grades">
                <p className="boulder-grade-value boulder6" style={{color: this.state.boulder6.color}}>{this.state.boulder6.grade}</p>
                <p className="boulder-arete boulder6">{this.state.arete6}</p>
              </div>
            </div>

            <div className="boulder-flex-row-container">
              <div className="boulder-date-set">
                <p className="boulder-date-value boulder4">{this.state.boulder4.dateSet}</p>
              </div>
              <div className="boulder-date-set">
                <p className="boulder-date-value boulder5">{this.state.boulder5.dateSet}</p>
              </div>
              <div className="boulder-date-set">
                <p className="boulder-date-value boulder6">{this.state.boulder6.dateSet}</p>
              </div>
            </div>

            <div className="boulder-flex-row-container">
              <div className="boulder-setter-name">
                <p className="boulder-setter-value boulder4">{this.state.boulder4.setter}</p>
              </div>
              <div className="boulder-setter-name">
                <p className="boulder-setter-value boulder5">{this.state.boulder5.setter}</p>
              </div>
              <div className="boulder-setter-name">
                <p className="boulder-setter-value boulder6">{this.state.boulder6.setter}</p>
              </div>
            </div>

            <div className="boulder-flex-row-container">
              <div className="boulder-placard-images">
                <img className="boulder-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="CRG Logo" />
              </div>
              <div className="boulder-placard-images boulder-flex-row-container">
                <img className="boulder-instagram-logo" src="/images/IG_logo.png" alt="Instagram Logo" />
                <p className="boulder-insta-handle">@crgworcester</p>
              </div>
            </div>
          </div>
        </div>

        <button className="noprint" type="submit" onClick={window.print}>Print</button>
      </>
    )
  }
}

export default PrintableBoulderCard