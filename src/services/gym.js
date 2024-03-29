// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setEmployeeList } from '../reducers/employeeReducers';

const baseUrl = process.env.REACT_APP_API_PATH;

// Define a service using a base URL and expected endpoints
export const gymApi = createApi({
  reducerPath: 'gymApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [
    'AllLocations', 'SingleLocation', 'LocationWithSections',
    'AllEmployees', 'SingleEmployee', 'LocationMetrics', 
    'AllSections', 'SingleRouteSection', 'SingleBoulderSection',
    'LocationSections', 'RouteDistribution', 'BoulderDistribution'
  ],
  endpoints: (builder) => ({
    /***********************************************
    *************       QUERIES       **************
    ***********************************************/

    /*********     Distributions queries     **********/
    getBoulderDistribution: builder.query({
      query: (gymId) => `currentBoulderGrades/${gymId}`,
      providesTags:['BoulderDistribution'],
    }),
    getRouteDistribution: builder.query({
      query: (gymId) => `currentRouteGrades/${gymId}`,
      providesTags:['RouteDistribution'],
    }),
    getDistributionEditFormData: builder.query({
      query: ({path, gymId}) => `${path}/${gymId}`,
      providesTags:['RouteDistribution', 'BoulderDistribution'],
    }),

    /*********     Locations queries     **********/
    getAllLocations: builder.query({
      query: () => 'gyms',
      providesTags: ['AllLocations'], 
    }),
    getLocationById: builder.query({
      query: (gymId) => `gymById/${gymId}`,
      providesTags: ['SingleLocation'], 
    }),
    getGymWithSections: builder.query({
      async queryFn(args, queryApi, extraOptions, fetchWithBQ) {
        // TODO: add error handling
        const {data: gym} = await fetchWithBQ(`gymWithSections/${args}`);
        let sortedRouteSections = [...gym?.routeSections];

        sortedRouteSections.sort((a,b) => a.id - b.id);

        return {data: {
          ...gym,
          routeSections: sortedRouteSections
        }}
      },
      providesTags: ['LocationWithSections'], 
    }),
    
    /*********     Employees queries     **********/
    getAllEmployees: builder.query({
      query: () => 'employees',
    // dispatch data to keep the store's state up to date when this query finishes
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          dispatch(setEmployeeList({ use: data }))
        } catch (err) {
          // `onError` side-effect
          console.log('Failure!')
        }
      },
      providesTags: ['AllEmployees'],
    }),
    getEmployeeById: builder.query({
      query: (employeeId) => `employees/${employeeId}`,
      providesTags: ['SingleEmployee'],
    }),

    /*********     Sections queries     **********/
    getAllSections: builder.query({
      query: () => 'allGymSections',
      providesTags: ['AllSections'],
    }),
    getSpecificRouteSections: builder.query({
      query: (gymId) => `routeSections/${gymId}`,
      providesTags: ['SingleRouteSection'], 
    }),
    getSpecificBoulderSections: builder.query({
      query: (gymId) => `boulderSections/${gymId}`,
      providesTags: ['SingleBoulderSection'], 
    }),
    getSectionsForSpecificGym: builder.query({
      query: (gymId) => `gymWithSections/${gymId}`,
      providesTags: ['LocationSections'], 
    }),

    /*********     Metrics queries     **********/
    getGymMetrics: builder.query({
      query: (gymId) => `metrics/${gymId}`,
      providesTags: ['LocationMetrics'], 
    }),


    /***********************************************
    ************       MUTATIONS       *************
    ***********************************************/
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),

    updateLocation: builder.mutation({
      query: (body) => ({
        url: 'updateGymInfo',  
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AllLocations', 'SingleLocation', 'LocationWithSections', 'LocationMetrics']
    }),

    updateSections: builder.mutation({
      query: ({type, sectionToUpdate}) => ({
        url: `update${type}SectionNames`,  
        method: 'POST',
        body: sectionToUpdate,
      }),
      invalidatesTags: ['AllSections'],
    }),

    updateEmployee: builder.mutation({
      query: (body) => ({
        url: `updateEmployee`,  
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AllEmployees'],
    }),

    updateBoulderDistribution: builder.mutation({
      query: (body) => ({
        url: `saveDistribution/currentBoulders`,  
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BoulderDistribution']
    }),

    updateRouteDistribution: builder.mutation({
      query: (body) => ({
        url: `saveDistribution/currentRoutes`,  
        method: 'POST',
        body,
      }),
      invalidatesTags: ['RouteDistribution'],
    }),
    // /saveDistribution/${type}`
    updateIdealDistribution: builder.mutation({
      query: ({body, type}) => ({
        url: `saveDistribution/${type}`,  
        method: 'POST',
        body,
      }),
      invalidatesTags: ['RouteDistribution, BoulderDistribution'],
    }),

    addNewEmployee: builder.mutation({
      query: (body) => ({
        url: `saveEmployee`,  
        method: 'POST',
        body,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['Employees'],
    }),

    addNewGym: builder.mutation({
      query: (body) => ({
        url: `saveNewGym`,  
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AllLocations', 'SingleLocation', 'LocationWithSections', 'LocationMetrics'],
    }),
  })
});

// Export hooks for usage in functional components
export const {
  useGetAllLocationsQuery,
  useGetAllSectionsQuery,
  useGetAllEmployeesQuery,
  useGetBoulderDistributionQuery,
  useGetRouteDistributionQuery,
  useGetDistributionEditFormDataQuery,
  useGetEmployeeByIdQuery,
  useGetGymWithSectionsQuery,
  useGetLocationByIdQuery,
  useGetSectionsForSpecificGymQuery,
  useGetSpecificBoulderSectionsQuery,
  useGetSpecificRouteSectionsQuery,
  useGetGymMetricsQuery,

  useLoginMutation,
  useUpdateLocationMutation,
  useUpdateSectionsMutation,
  useUpdateEmployeeMutation,
  useUpdateBoulderDistributionMutation,
  useUpdateRouteDistributionMutation,
  useUpdateIdealDistributionMutation,
  useAddNewEmployeeMutation,
  useAddNewGymMutation,
} = gymApi;