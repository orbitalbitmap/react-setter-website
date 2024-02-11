import { useEffect, useMemo, useReducer, useState } from "react";

import { useGetSpecificBoulderSectionsQuery } from "../../../../services/gym";
import getClimbListForPlacard from "../utils/getClimbListForPlacard";
import dayjs from "dayjs";

const useBoulderPlacardInfo = (distribution, gymId) => {
  const {data: sectionList} = useGetSpecificBoulderSectionsQuery(gymId);

  const initialPlacardState = useMemo(() => {
    return {
      climb1: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb2: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb3: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb4: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb5: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb6: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb7: {
        id: 'blank',
        color: 'Blank',
        grade: null,
        setter: null,
        areteMessage: null,
        dateSet: null,
      },
      climb8: {
        id: 'blank',
        color: 'Blank',
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

  const [currentSection, setCurrentSection] = useState(0);
  const [firstPlacardList, setFirstPlacardList] = useState([]);
  const [numberOfClimbsToDisplay, setNumberOfClimbsToDisplay] = useState(3);
  const [placardGridNumber, setPlacardGridNumber] = useState('three');
  const [secondPlacardList, setSecondPlacardList] = useState([]);
  const [sectionDistribution, setSectionDistribution] = useState([]);
  const [selectedClimbs, dispatchSelectedClimbs] = useReducer(placardSlotReducer, initialPlacardState);

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

  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setCurrentSection(sectionId)
  }

  const handleNonAreteInfo = (event) => {
    // subtracts the id from the first climb in the selected distribution list to get the climb's position in the array
    // IE: if the selected list contains ids from 31 - 88, the we need to subtract 31 from the event's value to get
    // the position of the climb in the filtered array 
    const climbInDistribution = parseInt(event.target.value) - (distribution[0]?.id);
    const { color, setter, grade, dateSet } = distribution[climbInDistribution];

    const dateSetFormatted = dayjs(dateSet).format('MM/DD/YYYY');

    dispatchSelectedClimbs({ type: event.target.name, payload: { color, setter, grade, dateSet: dateSetFormatted } });
  };


  const handleNumberOfClimbChange = (event) => {
    setNumberOfClimbsToDisplay(parseInt(event.target.id));
  };


  useEffect(() => {
    const filteredDistribution = distribution?.filter(climb => climb.sectionId === currentSection)
    const sortedFilteredDistribution = filteredDistribution?.sort((climbA, climbB) => climbA.position - climbB.position)

    dispatchSelectedClimbs({ type: "reset", payload: initialPlacardState });
    setSectionDistribution(sortedFilteredDistribution)
  }, [currentSection, distribution, initialPlacardState])

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
  }, [numberOfClimbsToDisplay, setFirstPlacardList, setPlacardGridNumber, setSecondPlacardList]);

  return {
    currentSection,
    firstPlacardList,
    numberOfClimbsToDisplay,
    placardGridNumber,
    secondPlacardList,
    sectionDistribution,
    sectionList,
    selectedClimbs,

    setFirstPlacardList,
    setPlacardGridNumber,
    setSecondPlacardList,

    handleAreteInfo,
    handleNonAreteInfo,
    handleNumberOfClimbChange,
    handleSectionChange,
  }
}

export default useBoulderPlacardInfo;