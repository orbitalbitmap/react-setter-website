import {
  SIGN_IN,
  SIGN_OUT
} from './types'

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user,
  }

  // dispatch({ type: CREATE_STREAM, payload: response.data })
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}