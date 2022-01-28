import { useReducer } from 'react'

import BoulderPlacard from './BoulderPlacard'
import PlacardSelectors from './PlacardSelectors'

const PrintableBoulderCard = (props) => {
  const initialState = {
    climb1: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null
    },
    climb2: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null
    },
    climb3: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null
    },
    climb4: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null
    },
    climb5: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null
    },
    climb6: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null
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
      case 'climb4':
        return {
          ...state, 
          climb4: 
            { ...state.climb4, ...action.payload }
        }
      case 'climb5':
        return {
          ...state, 
          climb5: 
            { ...state.climb5, ...action.payload }
        }
      case 'climb6':
        return {
          ...state, 
          climb6: 
            { ...state.climb6, ...action.payload }
        }
      default:
        return state
    }
  }

  const [selectedClimbs, dispatch] = useReducer(reducer, initialState)

  const handleNonAreteInfo = (event) => {
    const climbInArray = parseInt(event.target.value) - 1
    const { color, setter, grade, dateSet } = props.distribution[climbInArray]

    dispatch({ type: event.target.name, payload: { color, setter, grade, dateSet } })
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
        selectorType="boulder"
      />

      <BoulderPlacard
        climbs={ [selectedClimbs.climb1, selectedClimbs.climb2, selectedClimbs.climb3] }
      />

<PlacardSelectors
        class="noprint selection-container-bottom"
        distribution={props.distribution}
        handleClimbSelector={handleNonAreteInfo}
        handleAreteSelector={handleAreteInfo}
        startingSlotNum={4} // set to zero as the .map in the component starts by adding 1 to it
        nameList={['climb4','climb5','climb6']}
        selectorType="boulder"
      />

      <BoulderPlacard
        climbs={ [selectedClimbs.climb4, selectedClimbs.climb5, selectedClimbs.climb6] }
      />

      <button className="noprint" type="submit" onClick={window.print}>Print</button>
    </>
  )
}

export default PrintableBoulderCard