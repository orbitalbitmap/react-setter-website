import mockEmployeeList from "./mockEmployeeList";
import mockRouteSections from "./mockRouteSections";
import mockGymList from "./mockGymList";

const mockSingleGym = {
  ...mockGymList[0],
  employees: mockEmployeeList,
  routeSections: mockRouteSections,
};

export default mockSingleGym;