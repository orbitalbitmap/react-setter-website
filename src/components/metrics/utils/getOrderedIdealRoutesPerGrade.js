const getOrderedIdealRoutesPerGrade = (idealRoutesPerGrade) =>{
  return {
    '5.3': idealRoutesPerGrade['5_3'] || 0,
    '5.4': idealRoutesPerGrade['5_4'] || 0,
    '5.5': idealRoutesPerGrade['5_5'] || 0,
    '5.6': idealRoutesPerGrade['5_6'] || 0,
    '5.7': idealRoutesPerGrade['5_7'] || 0,
    '5.8': idealRoutesPerGrade['5_8'] || 0,
    '5.9': idealRoutesPerGrade['5_9'] || 0,
    '5.10-': idealRoutesPerGrade['5_10-'] || 0,
    '5.10': idealRoutesPerGrade['5_10'] || 0,
    '5.10+': idealRoutesPerGrade['5_10+'] || 0,
    '5.11-': idealRoutesPerGrade['5_11-'] || 0,
    '5.11': idealRoutesPerGrade['5_11'] || 0,
    '5.11+': idealRoutesPerGrade['5_11+'] || 0,
    '5.12-': idealRoutesPerGrade['5_12-'] || 0,
    '5.12': idealRoutesPerGrade['5_12'] || 0,
    '5.12+': idealRoutesPerGrade['5_12+'] || 0,
    '5.13-': idealRoutesPerGrade['5_13-'] || 0,
    '5.13': idealRoutesPerGrade['5_13'] || 0,
    '5.13+': idealRoutesPerGrade['5_13+'] || 0,
    '5.14-': idealRoutesPerGrade['5_14-'] || 0,
    '5.14': idealRoutesPerGrade['5_14'] || 0,
    '5.14+': idealRoutesPerGrade['5_14+'] || 0,
    '5.15-': idealRoutesPerGrade['5_15-'] || 0,
    '5.15': idealRoutesPerGrade['5_15'] || 0,
    '5.15+': idealRoutesPerGrade['5_15+'] || 0,
  }
};

export default getOrderedIdealRoutesPerGrade