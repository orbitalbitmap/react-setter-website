import axios from 'axios'
import {
  GET_LOCATIONS,
  SIGN_IN,
  SIGN_OUT,
} from './types'

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user,
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  }
}

export const getLocations = () => async dispatch => {
  const locationList = (await axios.get('http://localhost:1337/api/gyms'))

  dispatch({
    type: GET_LOCATIONS,
    payload: {locations: locationList.data }
  })
}