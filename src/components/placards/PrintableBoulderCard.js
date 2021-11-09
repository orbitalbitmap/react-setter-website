import React from 'react'
import axios from 'axios'

import BoulderPlacard from './BoulderPlacard'
import ClimbSelectors from './ClimbSelectors'

class PrintableBoulderCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
        <ClimbSelectors
          className="noprint selection-container-top"
          climbs={this.state.climbs}
          handleChange={this.handleChange}
          handleAreteSelect={this.handleAreteSelect}
          nameList={[1,2,3]}
          selectorType="boulder"
        />

        <BoulderPlacard 
          climbs={
            [
              {
                boulder1: this.state.boulder1,
                message: this.state.arete1
              }, {
                boulder2: this.state.boulder2,
                message: this.state.arete2
              }, {
                boulder3: this.state.boulder3,
                message: this.state.arete3
              },
            ]
          }
        />

        <ClimbSelectors
          className="noprint selection-container-bottom"
          climbs={this.state.climbs}
          handleChange={this.handleChange}
          handleAreteSelect={this.handleAreteSelect}
          nameList={[4,5,6]}
          selectorType="boulder"
        />

        <BoulderPlacard 
          climbs={
            [
              {
                boulder1: this.state.boulder4,
                message: this.state.arete4
              }, {
                boulder2: this.state.boulder5,
                message: this.state.arete5
              }, {
                boulder3: this.state.boulder6,
                message: this.state.arete6
              },
            ]
          }
        />

        <button className="noprint" type="submit" onClick={window.print}>Print</button>
      </>
    )
  }
}

export default PrintableBoulderCard