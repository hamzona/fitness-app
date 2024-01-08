import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://wger.de/api/v2/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const fetchBaseQueryWithReauth = async (args, api, extraOptons) => {
  let result = await baseQuery(args, api, extraOptons);
  if (result?.error?.status === 403) {
    const refresh = localStorage.getItem("refresh-token");
    const refreshResult = await fetch("https://wger.de/api/v2/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });
    const data = await refreshResult.json();
    if (data) {
      api.dispatch(setCredentials(data.access));
      result = await baseQuery(args, api, extraOptons);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQueryWithReauth,
  tagTypes: ["NutritionPlan", "measurments"],
  endpoints: (builder) => ({}),
});
