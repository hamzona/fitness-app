import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://wger.de/api/v2/",
  //credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const fetchBaseQueryWithReauth = async (args, api, extraOptons) => {
  let result = await baseQuery(args, api, extraOptons);
  console.log(result);
  if (result?.error?.status === 403) {
    const refresh = localStorage.getItem("refresh-token");
    const refreshResult = await baseQuery("/token/refresh", api, {
      body: { refresh },
      method: "POST",
    });
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data.token));

      result = await baseQuery(args, api, extraOptons);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQueryWithReauth,
  endpoints: (builder) => ({}),
});
