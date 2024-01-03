import mockEmployeeList from "./mockEmployeeList";
import mockRouteSections from "./mockRouteSections";
import mockBoulderSections from "./mockBoulderSections";
import mockGymList from "./mockGymList";

const mockSingleGym = {
  ...mockGymList[0],
  employees: mockEmployeeList,
  boulderSections: mockBoulderSections,
  routeSections: mockRouteSections,
};

export default mockSingleGym;