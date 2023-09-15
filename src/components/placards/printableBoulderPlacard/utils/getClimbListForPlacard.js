// Takes in two numbers and returns an array of values
//   - The start number is the initial number to start counting from
//   - The end number is the last number to end the loop
//   - The value pushed to the array is the word climb concatenated with the current value of i

const checkForValidInput = (input1, input2) => {
  let isValid = true;

  const inputHasString = typeof input1 === 'string' || typeof input2 === 'string';
  const inputIsUndefined = !input1 || !input2;

  if (inputHasString || inputIsUndefined) {
    isValid = false;
  }

  return isValid;
}

const getClimbListForPlacard = (startNumber, endNumber) => {
  let listOfClimbs = [];



  // returns an empty array when given invalid inputs
  if (!checkForValidInput(startNumber, endNumber)) return listOfClimbs;

  for (let i = startNumber; i <= endNumber; i++) {
    listOfClimbs = listOfClimbs.concat(`climb${i}`);
  }

  return listOfClimbs;
};

export default getClimbListForPlacard;