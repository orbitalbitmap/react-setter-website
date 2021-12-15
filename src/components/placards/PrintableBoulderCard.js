import React from 'react'
import axios from 'axios'

import BoulderPlacard from './BoulderPlacard'
import PlacardSelectors from './PlacardSelectors'

class PrintableBoulderCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      climbsPerPlacard: 3,
      selectedClimbs: {
        boulder1: {
          grade: null,
          color: null,
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
      },

      arete1: null,
      arete2: null,
      arete3: null,
      arete4: null,
      arete5: null,
      arete6: null,

      climbs: []
    }

    this.handleAreteSelect = this.handleAreteSelect.bind(this)
    this.handleClimbsPerPlacardChange = this.handleClimbsPerPlacardChange.bind(this)
    this.handleClimbSelector = this.handleClimbSelector.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/currentBoulderGrades/1') 

    this.setState({
      climbs: data
    })
  }

  handleClimbsPerPlacardChange(event) {
    this.setState({
      climbsPerPlacard: parseInt(event.target.value)
    })
  }

  handleClimbSelector(event) {
    const selectedClimb = this.state.climbs[event.target.value -1]

    if(event.target.value === 'blank') {
      this.setState({
        climbs: {
          ...this.state.selectedClimbs,
          [event.target.name]: {
            grade: null,
            color: null, 
            dateSet: null,
            setter: null,
          }
        }
      })
    } else {
      this.setState({
        selectedClimbs: {
          ...this.state.selectedClimbs,
          [event.target.name]: {
          grade: selectedClimb.grade,
          color: selectedClimb.color, 
          dateSet: selectedClimb.dateSet,
          setter: selectedClimb.setter,
          }
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

  getClimbList(startValue, endValue) {
    const climbsToPassDown = Object.entries(this.state.selectedClimbs)
    let climbList = []

    climbsToPassDown.forEach(([key, value]) => {
      const climbNumber = parseInt(key[key.length - 1])
      if (climbNumber >= startValue && climbNumber <= endValue) {
        climbList = climbList.concat({ ...value, message: this.state[`arete${climbNumber}`] })
      }
    })

    return climbList
  }

  render() {
    return (
      <>
        <label htmlFor="climbsPerPlacard"></label>
        <select onChange={this.handleClimbsPerPlacardChange} name="climbsPerPlacard" default="3">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <PlacardSelectors
          className="noprint selection-container-top"
          climbs={this.state.climbs}
          handleClimbSelector={this.handleClimbSelector}
          handleAreteSelect={this.handleAreteSelect}
          location="top"
          nameList={[1,2,3]}
          selectorType="boulder"
        />

        <BoulderPlacard
          climbs={ this.getClimbList(1, this.state.climbsPerPlacard) }
        />

        <PlacardSelectors
          className="noprint selection-container-bottom"
          climbs={this.state.climbs}
          handleClimbSelector={this.handleClimbSelector}
          handleAreteSelect={this.handleAreteSelect}
          location="bottom"
          nameList={[4,5,6]}
          selectorType="boulder"
        />

        <BoulderPlacard
          climbs={ this.getClimbList(this.state.climbsPerPlacard + 1, this.state.climbsPerPlacard * 2) }
        />

        <button className="noprint" type="submit" onClick={window.print}>Print</button>
      </>
    )
  }
}

export default PrintableBoulderCard