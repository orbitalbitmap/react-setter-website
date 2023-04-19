// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const gymApi = createApi({
  reducerPath: 'gymApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/' }),
  endpoints: (builder) => ({
    // queries
    getAllLocations: builder.query({
      query: () => 'gyms',
    }),
    getAllEmployees: builder.query({
      query: () => 'employees',
    }),
    getEmployeeById: builder.query({
      query: (id) => `employees/${id}`,
    }),

    // mutations
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllLocationsQuery,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useLoginMutation,
} = gymApi;