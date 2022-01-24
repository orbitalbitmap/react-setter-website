import { GET_LOCATIONS, REMOVE_LOCATIONS } from "../actions/types"

const locations = (state = null, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload.locations
    case REMOVE_LOCATIONS:
      return null
    default:
      return state
  }
}

export default locations