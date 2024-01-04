import mockEmployeeListFromSingleGym from "./mockEmployeeListForSingleGym"; 
import mockRouteSections from "./mockRouteSections";
import mockBoulderSections from "./mockBoulderSections";
import mockGymList from "./mockGymList";

const mockSingleGym = {
  ...mockGymList[0],
  employees: mockEmployeeListFromSingleGym,
  boulderSections: mockBoulderSections,
  routeSections: mockRouteSections,
};

export default mockSingleGym;