import dayjs from "dayjs";
import { useReducer, } from "react";

const useRoutePlacardInfo = (distribution) => {

  const initialPlacardState = {
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
      default:
        return state;
    }
  };

  const [selectedClimbs, dispatch] = useReducer(reducer, initialPlacardState);

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

  const handleNonAreteInfo = (event) => {
    const climbInArray = parseInt(event.target.value) - 1;
    const {
      color, setter, grade, dateSet, ropeStyle, climbName,
    } = distribution[climbInArray];

    const dateSetFormatted = dayjs(dateSet).format('MM/DD/YYYY');

    dispatch({
      type: event.target.name,
      payload: {
        color, setter, grade, dateSet: dateSetFormatted, ropeStyle, name: climbName,
      },
    });
  };

  return {
    selectedClimbs,
    handleAreteInfo,
    handleNonAreteInfo,
  }
}

export default useRoutePlacardInfo;