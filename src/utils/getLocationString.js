// Takes an array of objects, one of the object's keys called 'name',
// and concatenates the names together to form a single string
const getLocationString = (employeeLocations) => {
  if (!Array.isArray(employeeLocations)) return ""
  const locationNameList = employeeLocations?.map(location => {
    return location.name;
  });

  return locationNameList?.join(', ');
};

export default getLocationString;