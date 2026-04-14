import { createSlice } from "@reduxjs/toolkit";
import { readStorage, removeStorage, writeLocal } from "../../../components/utils/storage";

const initialState = {
  auth: false,
  relogin: true,
  notifys: 0,
  apiKey: readStorage('session.apiKey', null),
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
      const { key, value, notSave } = action.payload;
      state[key] = value;
      !notSave && writeLocal(`session.${key}`, value);
    },
    logoutSession: () => {
      removeStorage('session.apiKey');
      return {...initialState, relogin: false};
    },
  },
});

export const { updateSession, logoutSession } = sessionSlice.actions;

export default sessionSlice.reducer;