import React from 'react'
import axios from 'axios'
import ClimbSelectors from './ClimbSelectors'
import RoutePlacard from './RoutePlacard'

class PrintableRouteCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route1: {
        grade: null,
        color: null,
        dateSet: null,
        setter: null,
      },
      route2: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      route3: {
        grade: null,
        arete: null, 
        dateSet: null,
        setter: null,
      },
      arete1: null,
      arete2: null,
      arete3: null,
      climbs: [],
      emptyClimb: {}, 
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAreteSelect = this.handleAreteSelect.bind(this)
  }

  handleChange(event) {
    const selectedClimb = this.state.climbs[event.target.value -1]

    if(event.target.value === 'blank') {
      this.setState({
        [event.target.name]: {
          grade: null,
          color: null, 
          dateSet: null,
          setter: null,
          ropeStyle: null,
          name: null,
        }
      })
    } else {
      this.setState({
        [event.target.name]: {
          grade: selectedClimb.grade,
          color: selectedClimb.color, 
          dateSet: selectedClimb.dateSet,
          setter: selectedClimb.setter,
          ropeStyle: selectedClimb.ropeStyle,
          name: selectedClimb.climbName,
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

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/currentRouteGrades/1') 

    this.setState({
      climbs: data
    })
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
            selectorType="route"
          />

          <div className="placard-container">
            <div className="route-three-column-flex">
              <RoutePlacard 
                climbs={
                  [
                    {
                      route: this.state.route1,
                      message: this.state.arete1
                    }, {
                      route: this.state.route2,
                      message: this.state.arete2
                    }, {
                      route: this.state.route3,
                      message: this.state.arete3
                    }
                  ]
                }
                nameList={[1,2,3]}
              />
            </div>
          </div>
        </>
    )
  }
}

export default PrintableRouteCard