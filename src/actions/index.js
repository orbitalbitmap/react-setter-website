// const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const REMOVE_LOCATIONS = 'REMOVE_LOCATIONS';


// currently only imported in the UpdateEmployee function
// export const signIn = user => ({
//   type: SIGN_IN,
//   payload: user,
// });

// used in the the Logout and NavLogout components
export const signOut = () => ({
  type: SIGN_OUT,
  payload: null,
});

// used in the the Logout and NavLogout components
export const removeLocations = () => ({
  type: REMOVE_LOCATIONS,
  payload: null,
});
