// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_PATH;

// Define a service using a base URL and expected endpoints
export const gymApi = createApi({
  reducerPath: 'gymApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // queries
    getAllEmployeesAndGyms: builder.query({
      // queryfn assists with multiple api calls 
      async queryFn(args, queryApi, extraOptions, fetchWithBQ) {
        // TODO: add error handling
        console.log({args, queryApi, extraOptions})
        const locationResults = await fetchWithBQ('gyms');
        const employeeResults = await fetchWithBQ('employees');

        return { data: {
          locationData: locationResults.data,
          employeeData: employeeResults.data,
        }}
      }
    }),
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
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllEmployeesAndGymsQuery, 
  useGetAllLocationsQuery,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useLoginMutation,
} = gymApi;