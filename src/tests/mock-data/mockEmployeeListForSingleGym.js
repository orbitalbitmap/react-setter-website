import mockGymList from "./mockGymList";

const mockEmployeeListFromSingleGym = [
  {
    id: 1,
    firstName: 'test-admin',
    lastName: 'test',
    placardName: 'Admin',
    email: 'test@test.com',
    phoneNumber: null,
    roleId: 1,
    deletedAt: null,
    gyms: mockGymList,
  },
  {
    id: 2,
    firstName: 'test-full-time',
    lastName: 'test',
    placardName: 'Full',
    email: 'test@test.com',
    phoneNumber: null,
    roleId: 4,
    deletedAt: null,
    gyms: [
      { ...mockGymList[0] },
    ],
  },
  {
    id: 3,
    firstName: 'test-part-time',
    lastName: 'test',
    placardName: 'Part',
    email: 'test@test.com',
    phoneNumber: null,
    roleId: 5,
    deletedAt: null,
    gyms: [
      { ...mockGymList[0] },
    ],
  },
];

export default mockEmployeeListFromSingleGym;