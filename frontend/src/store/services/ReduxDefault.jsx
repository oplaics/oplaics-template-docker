import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { updateNotifer } from "../reducers/app/notifierReducer";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${window.location.protocol}//${window.location.hostname}/api/v1`,
  headers: { accept: "application/json" },
  prepareHeaders: (headers, { getState }) => {
    const apiKey = getState().auth.apiKey;
    if (apiKey) {
      headers.set("Authorization", `Bearer ${apiKey}`);
    }
    return headers;
  },
});

export const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const { error } = result;
    if (error.status === 'FETCH_ERROR') {
      api.dispatch(updateNotifer({ status: "offline" }));
    } else {
      api.dispatch(updateNotifer({
        status: error.status,
        text: error.data?.msg,
      }));
    }
  }
  return result;
};

/**
 * Default error handler for queries (for components using react-hook-form setError)
 */
export const handleQueryError = (err, dispatch, setError) => {
  const { error } = err;
  if (error.status === 'FETCH_ERROR' || !error) {
    dispatch(updateNotistack({ status: "offline" }));
  } else {
    if (error.status === 422 && error.data.errors && setError) {
      Object.keys(error.data.errors).forEach((key) => {
        setError(key, {
          type: "fetchRequest",
          message: `Error: ${error.data.errors[key][0]}`,
        });
      });
    }

    dispatch(updateNotistack({ status: error.status, text: error.data.msg }));
  }
};