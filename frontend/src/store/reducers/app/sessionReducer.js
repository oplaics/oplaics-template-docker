import { createSlice } from "@reduxjs/toolkit";
import { readStorage, removeStorage } from "../../../components/utils/storage";

const initialState = {
  auth: false,
  relogin: true,
  notifys: 0,
  apiKey: readStorage("session.apiKey", null),
  token_can: [],
  user: {},
  permissions: [],
  roles: [],
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateSession: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    updateUserSession: (state, action) => {
      const { user, permissions, apiKey, roles, token_can, notifys } = action.payload;

      state.user = user;
      state.permissions = permissions;
      state.roles = roles;
      state.token_can = token_can;
      state.apiKey = apiKey;
      state.notifys = notifys ?? state.notifys;
    },
    logoutSession: () => {
      removeStorage("session.apiKey");
      return { ...initialState, relogin: false };
    },
  },
});

export const { updateSession, updateUserSession, logoutSession } = sessionSlice.actions;

export default sessionSlice.reducer;
