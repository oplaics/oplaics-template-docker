import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../ReduxDefault";

/**
 * Endpoints
*/
import { register } from "./mutations/register";
import { login } from "./mutations/login";
import { relogin } from "./mutations/relogin";
import { logout } from "./mutations/logout";
import { tfa } from "./mutations/tfa";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["authApi"],
  endpoints: (builder) => ({
    register: register(builder),
    login: login(builder),
    relogin: relogin(builder),
    tfa: tfa(builder),
    logout: logout(builder),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useReloginMutation,
  useLogoutMutation,
  useTfaMutation,
} = authApi;