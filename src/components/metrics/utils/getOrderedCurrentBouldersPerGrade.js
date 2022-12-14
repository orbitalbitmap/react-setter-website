const getOrderedCurrentBouldersPerGrade = (currentBouldersPerGrade) => {
  return {
    VB: currentBouldersPerGrade.VB || 0,
    V0: currentBouldersPerGrade.V0 || 0,
    V1: currentBouldersPerGrade.V1 || 0,
    V2: currentBouldersPerGrade.V2 || 0,
    V3: currentBouldersPerGrade.V3 || 0,
    V4: currentBouldersPerGrade.V4 || 0,
    V5: currentBouldersPerGrade.V5 || 0,
    V6: currentBouldersPerGrade.V6 || 0,
    V7: currentBouldersPerGrade.V7 || 0,
    V8: currentBouldersPerGrade.V8 || 0,
    V9: currentBouldersPerGrade.V9 || 0,
    V10: currentBouldersPerGrade.V10 || 0,
    V11: currentBouldersPerGrade.V11 || 0,
    V12: currentBouldersPerGrade.V12 || 0,
    V13: currentBouldersPerGrade.V13 || 0,
    V14: currentBouldersPerGrade.V14 || 0,
    V15: currentBouldersPerGrade.V15 || 0,
    V16: currentBouldersPerGrade.V16 || 0,
  };
};

export default getOrderedCurrentBouldersPerGrade