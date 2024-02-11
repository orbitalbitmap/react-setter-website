import mockGymList from './mockGymList'

const mockUser = {
  id: 1,
  firstName: "test",
  lastName: "test",
  placardName: null,
  email: "test@test.com",
  phoneNumber: null,
  roleId: 1,
  deletedAt: null,
  role: {
    id: 1,
    role: "Director of Routesetting",
    deletedAt: null
  },
  gyms: mockGymList,
};


export default mockUser;