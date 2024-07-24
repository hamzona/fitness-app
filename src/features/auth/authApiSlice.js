import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/token",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.mutation({
      query: (credentials) => ({
        url: "token/refresh",
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
        url: "/nutritionplan",
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
      providesTags: ["measurments"],
    }),
    getMeasurmentsDetails: builder.query({
      query: (credentials) => ({
        url: `measurement-category/${credentials}`,
        method: "GET",
      }),
      providesTags: ["measurments"],
    }),
    getMeasurmentsList: builder.query({
      query: (credentials) => ({
        url: `/measurement/?category=${credentials}`,
        method: "GET",
      }),
      providesTags: ["measurments"],
    }),
    postMeasurment: builder.mutation({
      query: (credentials) => ({
        url: "/measurement",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["measurments"],
    }),
    deleteMeasurment: builder.mutation({
      query: (credentials) => ({
        url: `/measurement/${credentials.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["measurments"],
    }),
    addMeasurmentCategory: builder.mutation({
      query: (credentials) => ({
        url: "/measurement-category",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["measurments"],
    }),
    getIngredients: builder.mutation({
      query: (credentials) => ({
        url: `/ingredientinfo?limit=${20}&offset=${20 * credentials.page}`,
      }),
      method: "GET",
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
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
  usePostMeasurmentMutation,
  useDeleteMeasurmentMutation,
  useAddMeasurmentCategoryMutation,
  useGetIngredientsMutation,
  useRegisterMutation,
} = authApiSlice;
