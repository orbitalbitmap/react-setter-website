const getLocationString = (employeeLocations) => {
  const locationNameList = employeeLocations?.map(location => {
    return location.name;
  });

  return locationNameList?.join(', ');
};

export default getLocationString;