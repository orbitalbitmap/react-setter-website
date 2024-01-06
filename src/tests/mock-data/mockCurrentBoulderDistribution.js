import dayjs from "dayjs";

import mockSingleGym from "./mockSingleGym";
import mockFullEmployeeList from "./mockFullEmployeeList";

const today = dayjs();

const mockCurrentBoulderDistribution = [
  {
    id: 1,
    gymId: 1,
    grade: "V10",
    color: "White",
    setterId: mockFullEmployeeList[2].id,
    setter: mockFullEmployeeList[2].placardName,
    holds: null,
    style: null,
    sectionId: 1,
    dateSet: today.format('YYYY-MM-DD'),
    position: null,
    deletedAt: null,
    gym: mockSingleGym,
  },
  {
    id: 2,
    gymId: 1,
    grade: "V2",
    color: "Green",
    setterId: mockFullEmployeeList[1].id,
    setter: mockFullEmployeeList[1].placardName,
    holds: null,
    style: null,
    sectionId: 1,
    dateSet: today.format('YYYY-MM-DD'),
    position: null,
    deletedAt: null,
    gym: mockSingleGym,
  },
  {
    id: 3,
    gymId: 1,
    grade: "V5",
    color: "Red",
    setterId: mockFullEmployeeList[0].id,
    setter: mockFullEmployeeList[0].placardName,
    holds: null,
    style: null,
    sectionId: 2,
    dateSet: today.format('YYYY-MM-DD'),
    position: null,
    deletedAt: null,
    gym: mockSingleGym,
  },
  {
    id: 4,
    gymId: 1,
    grade: "VB",
    color: "Black",
    setterId: mockFullEmployeeList[1].id,
    setter: mockFullEmployeeList[1].placardName,
    holds: null,
    style: null,
    sectionId: 3,
    dateSet: today.format('YYYY-MM-DD'),
    position: null,
    deletedAt: null,
    gym: mockSingleGym,
  },
];

export default mockCurrentBoulderDistribution;