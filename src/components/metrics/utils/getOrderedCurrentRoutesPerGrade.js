const getCurrentRoutesPerGrade = (currentRoutesPerGrade) =>{
  return {
    '5.3': currentRoutesPerGrade['5.3'] || 0,
    '5.4': currentRoutesPerGrade['5.4'] || 0,
    '5.5': currentRoutesPerGrade['5.5'] || 0,
    '5.6': currentRoutesPerGrade['5.6'] || 0,
    '5.7': currentRoutesPerGrade['5.7'] || 0,
    '5.8': currentRoutesPerGrade['5.8'] || 0,
    '5.9': currentRoutesPerGrade['5.9'] || 0,
    '5.10-': currentRoutesPerGrade['5.10-'] || 0,
    '5.10': currentRoutesPerGrade['5.10'] || 0,
    '5.10+': currentRoutesPerGrade['5.10+'] || 0,
    '5.11-': currentRoutesPerGrade['5.11-'] || 0,
    '5.11': currentRoutesPerGrade['5.11'] || 0,
    '5.11+': currentRoutesPerGrade['5.11+'] || 0,
    '5.12-': currentRoutesPerGrade['5.12-'] || 0,
    '5.12': currentRoutesPerGrade['5.12'] || 0,
    '5.12+': currentRoutesPerGrade['5.12+'] || 0,
    '5.13-': currentRoutesPerGrade['5.13-'] || 0,
    '5.13': currentRoutesPerGrade['5.13'] || 0,
    '5.13+': currentRoutesPerGrade['5.13+'] || 0,
    '5.14-': currentRoutesPerGrade['5.14-'] || 0,
    '5.14': currentRoutesPerGrade['5.14'] || 0,
    '5.14+': currentRoutesPerGrade['5.14+'] || 0,
    '5.15-': currentRoutesPerGrade['5.15-'] || 0,
    '5.15': currentRoutesPerGrade['5.15'] || 0,
    '5.15+': currentRoutesPerGrade['5.15+'] || 0,
  }
};

export default getCurrentRoutesPerGrade