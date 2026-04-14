import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../ReduxDefault";

/**
 * Endpoints
*/
import { register } from "./mutations/register";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["authApi"],
  endpoints: (builder) => ({
    register: register(builder),
  }),
});

export const {
  useRegisterMutation,
} = authApi;