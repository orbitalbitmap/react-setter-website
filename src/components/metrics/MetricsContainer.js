import React from 'react'
import axios from 'axios'

import BoulderIdealVsCurrent from './partials/BoulderIdealVsCurrent'
import BouldersPerSetter from './partials/BouldersPerSetter'
import BouldersPerColor from './partials/BouldersPerColor'
import RouteIdealVsCurrent from './partials/RouteIdealVsCurrent'
import RoutesPerSetter from './partials/RoutesPerSetter'
import RoutesPerColor from './partials/RoutesPerColor'

class MetricsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gym: "Worcester",
      metrics: {},
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/metrics/1')

    this.setState({
      metrics: data.metrics
    })
  }

  render() {
    return (
      <>
        <h1 className="centered-text">{this.state.gym} Metrics</h1>

        <div className="idealVsCurrent-wrapper centered-text">
            {
              this.state.metrics.boulderSetterCount
                ? <BouldersPerSetter data={this.state.metrics.boulderSetterCount} />
                : <h2 className="centered-text">No Data Found For Setters Per Boulders</h2>
            }
        </div>

        <div className="idealVsCurrent-wrapper centered-text">
          {
            this.state.metrics.routeSetterCount
              ? <RoutesPerSetter data={this.state.metrics.routeSetterCount} />
              : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
          }
        </div>
        
        <div className="idealVsCurrent-wrapper centered-text">
          {
            this.state.metrics.boulderColorCount
              ? <BouldersPerColor data={this.state.metrics.boulderColorCount} />
              : <h2 className="centered-text">No Data Found For Boulders Per Color</h2>
          }
        </div>
          
          {/* r/color */}
        <div className="idealVsCurrent-wrapper centered-text">
          {
            this.state.metrics.routeColorCount
              ? <RoutesPerColor data={this.state.metrics.routeColorCount} />
              : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
          }
          </div>
          
          {/* ideal vs current boulder */}
        <div className="idealVsCurrent-wrapper centered-text">
          {
            this.state.metrics.boulderSetterCount
              ? <BoulderIdealVsCurrent
                data={{
                  currentBoulderGradeCount: this.state.metrics.currentBoulderGradeCount,
                  idealBoulderGradeCount: this.state.metrics.idealBoulderGradeCount,
                }}
                />
              : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
          }
          </div>
          
          {/* ideal vs current rope */}
        <div className="idealVsCurrent-wrapper centered-text">
          {
            this.state.metrics.currentRouteGradeCount && this.state.metrics.idealRouteGradeCount
              ? <RouteIdealVsCurrent
                data={{
                  currentRouteGradeCount: this.state.metrics.currentRouteGradeCount,
                  idealRouteGradeCount: this.state.metrics.idealRouteGradeCount,
                }}
              />
              : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
          }
        </div>
      </>
    )
  }
}

export default MetricsContainer