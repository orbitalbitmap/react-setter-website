const getClimbListForPlacard = (startNumber, numberOfClimbs) => {
  let listOfClimbs = [];

  for (let i = startNumber; i <= numberOfClimbs; i++) {
    listOfClimbs = listOfClimbs.concat(`climb${i}`);
  }

  return listOfClimbs;
};

export default getClimbListForPlacard;