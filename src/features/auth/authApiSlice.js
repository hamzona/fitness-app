import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "token/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: (credentials) => ({
        url: "token/refresh/",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),
    getProfilInfo: builder.query({
      query: () => ({
        url: "userprofile",
        method: "GET",
      }),
    }),
    getNutritionPlan: builder.query({
      query: () => ({
        url: "nutritionplan",
        method: "GET",
      }),
      providesTags: ["NutritionPlan"],
    }),
    createNutritionPlan: builder.mutation({
      query: (credentials) => ({
        url: "/nutritionplan/",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["NutritionPlan"],
    }),
    editNutritonPlan: builder.mutation({
      query: (credentials) => ({
        url: `/nutritionplan/${credentials.id}`,
        method: "PUT",
        body: { ...credentials },
      }),
      invalidatesTags: ["NutritionPlan"],
    }),
    deleteNutritionPlan: builder.mutation({
      query: (credentials) => ({
        url: `/nutritionplan/${credentials}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NutritionPlan"],
    }),
    getMeasurments: builder.query({
      query: () => ({
        url: "measurement-category",
        method: "GET",
      }),
    }),
    getMeasurmentsDetails: builder.query({
      query: (credentials) => ({
        url: `measurement-category/${credentials}`,
        method: "GET",
      }),
    }),
    getMeasurmentsList: builder.query({
      query: () => ({
        url: "measurement",
        method: "GET",
      }),
    }),
    getIngredients: builder.query({
      query: () => ({
        url: "ingredient/",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useGetProfilInfoQuery,
  useGetNutritionPlanQuery,
  useCreateNutritionPlanMutation,
  useEditNutritonPlanMutation,
  useDeleteNutritionPlanMutation,
  useGetMeasurmentsQuery,
  useGetMeasurmentsDetailsQuery,
  useGetMeasurmentsListQuery,
  useGetIngredientsQuery,
} = authApiSlice;
