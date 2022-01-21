import { GET_LOCATIONS } from "../actions/types"

const locations = (state = null, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload.locations
    default:
      return state
  }
}

export default locations