import { Box } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';

import BoulderPlacard from './BoulderPlacard';
import PlacardSelectors from './PlacardSelectors';

function PrintableBoulderCard(props) {
  const initialState = {
    climb1: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb2: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb3: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb4: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb5: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb6: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb7: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
    climb8: {
      color: null,
      grade: null,
      setter: null,
      areteMessage: null,
      dateSet: null,
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'climb1':
        return {
          ...state,
          climb1:
            { ...state.climb1, ...action.payload },
        };
      case 'climb2':
        return {
          ...state,
          climb2:
            { ...state.climb2, ...action.payload },
        };
      case 'climb3':
        return {
          ...state,
          climb3:
            { ...state.climb3, ...action.payload },
        };
      case 'climb4':
        return {
          ...state,
          climb4:
            { ...state.climb4, ...action.payload },
        };
      case 'climb5':
        return {
          ...state,
          climb5:
            { ...state.climb5, ...action.payload },
        };
      case 'climb6':
        return {
          ...state,
          climb6:
            { ...state.climb6, ...action.payload },
        };
      case 'climb7':
        return {
          ...state,
          climb7:
            { ...state.climb7, ...action.payload },
        };
      case 'climb8':
        return {
          ...state,
          climb8:
            { ...state.climb8, ...action.payload },
        };
      default:
        return state;
    }
  };

  const [selectedClimbs, dispatch] = useReducer(reducer, initialState);
  const [numberOfClimbsToDisplay, setNumberOfClimbsToDisplay] = useState(3);
  const [placardGridNumber, setPlacardGridNumber] = useState('three');
  const [firstPlacardList, setFirstPlacardList] = useState([]);
  const [secondPlacardList, setSecondPlacardList] = useState([]);

  const handleNonAreteInfo = (event) => {
    const climbInDistribution = parseInt(event.target.value) - (props.distribution[0].id);
    const { color, setter, grade, dateSet } = props.distribution[climbInDistribution];

    const dateSetFormatted = new Date(dateSet).toLocaleDateString('en-us');

    dispatch({ type: event.target.name, payload: { color, setter, grade, dateSet: dateSetFormatted } });
  };

  const handleAreteInfo = (event) => {
    let areteMessage;

    switch (parseInt(event.target.value)) {
      case 2:
        areteMessage = 'Arete on';
        break;
      case 3:
        areteMessage = 'Arete off';
        break;
      default:
        areteMessage = null;
    }

    dispatch({ type: event.target.name, payload: { areteMessage } });
  };

  const handleNumberOfClimbChange = (event) => {
    setNumberOfClimbsToDisplay(parseInt(event.target.value));
  };

  const getClimbListForPlacard = (startNuber, numberOfClimbs) => {
    let listOfClimbs = [];

    for (let i = startNuber; i <= numberOfClimbs; i++) {
      listOfClimbs = listOfClimbs.concat(`climb${i}`);
    }

    return listOfClimbs;
  };

  // setting the css class for the placard grid
  useEffect(() => {
    let newPlacardGridNumber = '';
    const firstClimbList = getClimbListForPlacard(1, numberOfClimbsToDisplay);
    const secondClimbList = getClimbListForPlacard(numberOfClimbsToDisplay + 1, numberOfClimbsToDisplay * 2);

    switch (numberOfClimbsToDisplay) {
      case 1:
        newPlacardGridNumber = 'one';
        break;
      case 2:
        newPlacardGridNumber = 'two';
        break;
      case 3:
        newPlacardGridNumber = 'three';
        break;
      case 4:
        newPlacardGridNumber = 'four';
        break;
      default:
        newPlacardGridNumber = 'three';
    }

    setPlacardGridNumber(newPlacardGridNumber);
    setFirstPlacardList(firstClimbList);
    setSecondPlacardList(secondClimbList);
  }, [numberOfClimbsToDisplay]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ mt: 12, mx: 'auto', }}>
      <Box className='noprint' sx={{ mb: '2rem', textAlign: 'center', }}>
        <label >Climbs per placards: </label>
        <select className="boulder-selectors-box" onChange={handleNumberOfClimbChange} defaultValue="3">
          <option value="1">1 climbs</option>
          <option value="2">2 climbs</option>
          <option value="3">3 climbs</option>
          <option value="4">4 climbs</option>
        </select>
      </Box>

      <Box sx={{ mb: '5rem', height: '50rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <PlacardSelectors
          class="noprint"
          distribution={props.distribution}
          handleClimbSelector={handleNonAreteInfo}
          handleAreteSelector={handleAreteInfo}
          startingSlotNum={0} // set to zero as the .map in the component starts by adding 1 to it
          nameList={firstPlacardList}
          selectorType="boulder"
        />

        <BoulderPlacard
          climbList={selectedClimbs}
          climbsToDisplay={firstPlacardList}
          numberOfClimbsClass={placardGridNumber}
        />
      </Box>

      <Box sx={{ height: '40rem', display: 'flex', flexDirection: 'row', width: '90rem', alignItems: 'center' }}>
        <PlacardSelectors
          class="noprint"
          distribution={props.distribution}
          handleClimbSelector={handleNonAreteInfo}
          handleAreteSelector={handleAreteInfo}
          startingSlotNum={numberOfClimbsToDisplay} // set to zero as the .map in the component starts by adding 1 to it
          nameList={secondPlacardList}
          selectorType="boulder"
        />

        <BoulderPlacard
          climbList={selectedClimbs}
          climbsToDisplay={secondPlacardList}
          numberOfClimbsClass={placardGridNumber}
        />
      </Box>
    </Box>
  );
}

export default PrintableBoulderCard;
