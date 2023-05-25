export const updateDistributionDates = (state, action) => {
  const {newDate, sectionIdToUpdate, type} = action.payload;
  const distribution = state[type]

  const newDistribution = distribution.map( climb => {
    const updatedClimb = { ...climb }
    if (updatedClimb.sectionId === sectionIdToUpdate) {
      updatedClimb.dateSet = newDate;
    };

    return updatedClimb;
  });
  
  state[type] = newDistribution;
}

export default updateDistributionDates;