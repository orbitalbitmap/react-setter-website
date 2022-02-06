import axios from 'axios'
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import BoulderIdealVsCurrent from './partials/BoulderIdealVsCurrent'
import BouldersPerSetter from './partials/BouldersPerSetter'
import BouldersPerColor from './partials/BouldersPerColor'
import RouteIdealVsCurrent from './partials/RouteIdealVsCurrent'
import RoutesPerSetter from './partials/RoutesPerSetter'
import RoutesPerColor from './partials/RoutesPerColor'

const MetricsContainer = () => {
  const urlParams = useParams()
  const [ gymName, setGymName] = useState('')
  const [ metrics, setMetrics] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/metrics/${urlParams.id}`)

      
      setGymName(data.gym.name)
      setMetrics(data.metrics)
    }

    getInfo()
  }, [urlParams])

  return (
    <>
      <h1 className="centered-text">{gymName} Metrics</h1>

      <div className="idealVsCurrent-wrapper centered-text">
          {
            metrics.boulderSetterCount
              ? <BouldersPerSetter data={metrics.boulderSetterCount} />
              : <h2 className="centered-text">No Data Found For Setters Per Boulders</h2>
          }
      </div>

      <div className="idealVsCurrent-wrapper centered-text">
        {
          metrics.routeSetterCount
            ? <RoutesPerSetter data={metrics.routeSetterCount} />
            : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
        }
      </div>
      
      <div className="idealVsCurrent-wrapper centered-text">
        {
          metrics.boulderColorCount
            ? <BouldersPerColor data={metrics.boulderColorCount} />
            : <h2 className="centered-text">No Data Found For Boulders Per Color</h2>
        }
      </div>
        
        {/* r/color */}
      <div className="idealVsCurrent-wrapper centered-text">
        {
          metrics.routeColorCount
            ? <RoutesPerColor data={metrics.routeColorCount} />
            : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
        }
        </div>
        
        {/* ideal vs current boulder */}
      <div className="idealVsCurrent-wrapper centered-text">
        {
          metrics.boulderSetterCount
            ? <BoulderIdealVsCurrent
              data={{
                currentBoulderGradeCount: metrics.currentBoulderGradeCount,
                idealBoulderGradeCount: metrics.idealBoulderGradeCount,
              }}
              />
            : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
        }
        </div>
        
        {/* ideal vs current rope */}
      <div className="idealVsCurrent-wrapper centered-text">
        {
          metrics.currentRouteGradeCount && metrics.idealRouteGradeCount
            ? <RouteIdealVsCurrent
              data={{
                currentRouteGradeCount: metrics.currentRouteGradeCount,
                idealRouteGradeCount: metrics.idealRouteGradeCount,
              }}
            />
            : <h2 className="centered-text">No Data Found For Setters Per Routes</h2>
        }
      </div>
    </>
  )
}

export default MetricsContainer