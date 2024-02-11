import mockGymList from "./mockGymList";
import mockEmployeeListFromSingleGym from './mockEmployeeListForSingleGym';

const mockFullEmployeeList = [
  ...mockEmployeeListFromSingleGym,
  {
    id: 4,
    firstName: 'part-test-time',
    lastName: 'test2',
    placardName: 'Part2',
    email: 'pttt@test.com',
    phoneNumber: null,
    roleId: 5,
    deletedAt: null,
    gyms: [
      { ...mockGymList[1] },
    ],
  },
];

export default mockFullEmployeeList;