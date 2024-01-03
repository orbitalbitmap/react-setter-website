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
  gyms: [
    {
      id: 1,
      name: "Worcester",
      address: "299 Barber Avenue Worcester, MA 01606",
      phoneNumber: "508-852-7625",
      headSetterId: 1,
      deletedAt: null
    },
  ],
};


export default mockUser;