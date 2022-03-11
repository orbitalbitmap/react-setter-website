import { useReducer } from 'react'

import PlacardSelectors from './PlacardSelectors'
import RoutePlacard from './RoutePlacard'

const PrintableRouteCard = (props) => {
  const initialState = {
    climb1: {
      grade: null,
      color: null, 
      dateSet: null,
      setter: null,
      ropeStyle: null,
      name: null,
      areteMessage: null,
    },
    climb2: {
      grade: null,
      color: null, 
      dateSet: null,
      setter: null,
      ropeStyle: null,
      name: null,
      areteMessage: null,
    },
    climb3: {
      grade: null,
      color: null, 
      dateSet: null,
      setter: null,
      ropeStyle: null,
      name: null,
      areteMessage: null,
    },
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'climb1':
        return {
          ...state, 
          climb1: 
            { ...state.climb1, ...action.payload }
        }
      case 'climb2':
        return {
          ...state, 
          climb2: 
            { ...state.climb2, ...action.payload }
        }
      case 'climb3':
        return {
          ...state, 
          climb3: 
            { ...state.climb3, ...action.payload }
        }
      default:
        return state
    }
  }

  const [selectedClimbs, dispatch] = useReducer(reducer, initialState)

  const handleNonAreteInfo = (event) => {
    const climbInArray = parseInt(event.target.value) - 1
    const { color, setter, grade, dateSet, ropeStyle, climbName } = props.distribution[climbInArray]

    const dateSetFormatted = new Date(dateSet).toLocaleDateString('en-us')

    dispatch({ type: event.target.name, payload: { color, setter, grade, dateSet: dateSetFormatted, ropeStyle, name: climbName } })
  }

  const handleAreteInfo = (event) => {
    let areteMessage

    switch (parseInt(event.target.value)) {
      case 2:
        areteMessage = "Arete on"
        break
      case 3:
        areteMessage = "Arete off"
        break
      default:
        areteMessage = null
    }

    dispatch({ type: event.target.name, payload: { areteMessage } })
  }

  return (
    <>
      <PlacardSelectors
        class="noprint selection-container-top"
        distribution={props.distribution}
        handleClimbSelector={handleNonAreteInfo}
        handleAreteSelector={handleAreteInfo}
        startingSlotNum={0} // set to zero as the .map in the component starts by adding 1 to it
        nameList={['climb1','climb2','climb3']}
        selectorType="route"
      />

      <div className="route-placard-container centered-text"> 
        <div className="route-three-grid-column">
          <RoutePlacard
            climbs={ selectedClimbs }
            nameList={['climb1', 'climb2', 'climb3']}
          />
        </div>
        <div className="route-image-grid">
          <div className="route-placard-images">
            <img className="route-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="Central Rock Gym logo" />
          </div>
          <div className="route-social-grid">
            <div>
              <img className="route-instagram-logo" src="/images/Facebook_logo.png" alt="Facbook logo"/>
              <div className="route-insta-handle">Central Rock Worcester</div>
            </div>
            <div>
              <img className="route-instagram-logo" src="/images/Twitter_colored_logo.png" alt="Twitter logo"/>
              <span className="route-insta-handle">@crgworcester</span>
            </div>
            <div>
              <img className="route-instagram-logo" src="/images/IG_logo.png" alt="Instagram logo"/>
              <span className="route-insta-handle">@crgworcester</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrintableRouteCard