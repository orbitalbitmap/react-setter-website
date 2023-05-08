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
    getLocationById: builder.query({
      query: (gymId) => `gymById/${gymId}`,
    }),
    
    
    getAllEmployees: builder.query({
      query: () => 'employees',
    }),
    getEmployeeById: builder.query({
      query: (employeeId) => `employees/${employeeId}`,
    }),


    getSpecificBoulderSections: builder.query({
      query: (gymId) => `boulderSections/${gymId}`
    }),

    getSectionsForSpecificGym: builder.query({
      query: (gymId) => `gymWithSections/${gymId}`
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
  useGetLocationByIdQuery,
  useGetSpecificBoulderSectionsQuery,
  useGetSectionsForSpecificGymQuery,

  useLoginMutation,
} = gymApi;