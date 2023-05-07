import axios from 'axios';
import { Box } from '@mui/material';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

import BoulderPlacard from './BoulderPlacard';
import PlacardSelectors from '../components/PlacardSelectors';
import SectionsList from '../../distributions/SectionsList';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'


const PrintableBoulderCard = () => {
  const distribution = useSelector(state => state.distribution.boulderDistribution)
  const gymId = distribution[0].gymId;
  const initialPlacardState = useMemo(() => {
    return {
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
    }
  }, []);

  const placardSlotReducer = (state, action) => {
    switch (action.type) {
      case 'reset':
        return action.payload;
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

  const [selectedClimbs, dispatchSelectedClimbs] = useReducer(placardSlotReducer, initialPlacardState);
  const [numberOfClimbsToDisplay, setNumberOfClimbsToDisplay] = useState(3);
  const [placardGridNumber, setPlacardGridNumber] = useState('three');
  const [firstPlacardList, setFirstPlacardList] = useState([]);
  const [secondPlacardList, setSecondPlacardList] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionDistribution, setSectionDistribution] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setCurrentSection(sectionId)
  }

  useEffect(() => {
    const getInfo = async() => {
      const sectionList = await axios.get(`${process.env.REACT_APP_API_PATH}/boulderSections/${gymId}`);
      setSectionList(sectionList.data);
    }

    getInfo()
  }, [gymId, initialPlacardState])

  useEffect(() => {
    dispatchSelectedClimbs({ type: "reset", payload: initialPlacardState });
  }, [initialPlacardState, sectionDistribution])

  console.log({selectedClimbs, initialPlacardState})

  useEffect(() => {
    const filteredDistribution = distribution.filter(climb => climb.sectionId === currentSection)
    const sortedFilteredDistribution = filteredDistribution.sort((climbA, climbB) => climbA.position - climbB.position)

    setSectionDistribution(sortedFilteredDistribution)
  }, [distribution, currentSection])

  const handleNonAreteInfo = (event) => {
    // subtracts the id from the first climb in the selected distribution list to get the climb's position in the array
    // IE: if the selected list contains ids from 31 - 88, the we need to subtract 31 from the event's value to get
    // the position of the climb in the filtered array 
    const climbInDistribution = parseInt(event.target.value) - (distribution[0].id);
    const { color, setter, grade, dateSet } = distribution[climbInDistribution];

    const dateSetFormatted = new Date(dateSet).toLocaleDateString('en-us');

    dispatchSelectedClimbs({ type: event.target.name, payload: { color, setter, grade, dateSet: dateSetFormatted } });
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

    dispatchSelectedClimbs({ type: event.target.name, payload: { areteMessage } });
  };

  const handleNumberOfClimbChange = (event) => {
    setNumberOfClimbsToDisplay(parseInt(event.target.id));
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

  return (
    <Box sx={{ mx: 'auto', ml: '10rem', }}>
      <Grid container  spacing={1} className='noprint' sx={{ mt: '5rem', mb: '5rem', textAlign: 'center', width: '40rem', }}>
        <Grid item xs={6}>
          <FormControl sx={{ width: '10rem' }}>
            <InputLabel>Climbs Per Placard</InputLabel>
            <Select
              label="Climbs Per Placard"
              labelId="Climbs-Per-Placard"
              value={numberOfClimbsToDisplay}
            >
              <MenuItem
                key={`per-placard-${1}`}
                id={1}
                value="1"
                onClick={handleNumberOfClimbChange}
              >
                1
              </MenuItem>
              <MenuItem
                key={`per-placard-${2}`}
                id={2}
                value="2"
                onClick={handleNumberOfClimbChange}
              >
                2
              </MenuItem>
              <MenuItem
                key={`per-placard-${3}`}
                id={3}
                value="3"
                onClick={handleNumberOfClimbChange}
              >
                3
              </MenuItem>
              <MenuItem
                key={`per-placard-${4}`}
                id={4}
                value="4"
                onClick={handleNumberOfClimbChange}
              >
                4
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} className="section-selectors-container centered-text" sx={{ mx: 'auto', }}>
          {
            sectionList.length > 0
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={currentSection} />
              : null
          }
        </Grid>
      </Grid>

      <Grid container spacing={6} sx={{ mb: '5rem', }}>
        <Grid item xs={6} className='noprint'>
          <PlacardSelectors
            distribution={sectionDistribution}
            handleClimbSelector={handleNonAreteInfo}
            handleAreteSelector={handleAreteInfo}
            startingSlotNum={0} // set to zero as the .map in the component starts by adding 1 to it
            nameList={firstPlacardList}
            selectorType="boulder"
          />
        </Grid>

        <Grid item xs={6} >
          <BoulderPlacard
            climbList={selectedClimbs}
            climbsToDisplay={firstPlacardList}
            numberOfClimbsClass={placardGridNumber}
          />
        </Grid>
      </Grid>


      <Grid container spacing={6}>
        <Grid item xs={6} className='noprint'>
          <PlacardSelectors
            class="noprint"
            distribution={sectionDistribution}
            handleClimbSelector={handleNonAreteInfo}
            handleAreteSelector={handleAreteInfo}
            startingSlotNum={numberOfClimbsToDisplay} // set to zero as the .map in the component starts by adding 1 to it
            nameList={secondPlacardList}
            selectorType="boulder"
          />
        </Grid>
        <Grid item xs={6} >
          <BoulderPlacard
            climbList={selectedClimbs}
            climbsToDisplay={secondPlacardList}
            numberOfClimbsClass={placardGridNumber}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PrintableBoulderCard;
