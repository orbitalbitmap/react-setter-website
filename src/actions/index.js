import axios from 'axios';
import {
  GET_LOCATIONS,
  REMOVE_LOCATIONS,
  SIGN_IN,
  SIGN_OUT,
} from './types';

export const signIn = user => ({
  type: SIGN_IN,
  payload: user,
});

export const signOut = () => ({
  type: SIGN_OUT,
  payload: null,
});

export const getLocations = () => async (dispatch) => {
  const locationList = (await axios.get(`${process.env.REACT_APP_API_PATH}/gyms`));

  dispatch({
    type: GET_LOCATIONS,
    payload: { locations: locationList.data },
  });
};

export const removeLocations = () => ({
  type: REMOVE_LOCATIONS,
  payload: null,
});
