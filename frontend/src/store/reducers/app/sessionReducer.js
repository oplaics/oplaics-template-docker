import { createSlice } from "@reduxjs/toolkit";
import { readStorage, writeLocal } from "../../../components/utils/storage";

const initialState = {
  theme: readStorage("userConfig.theme", "light"),
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateSession: (state, action) => {
      const { key, value, notSave } = action.payload;
      state[key] = value;
      !notSave && localStorage.setItem(`session.${key}`, JSON.stringify(value));
    },
  },
});

export const { updateSession } = sessionSlice.actions;

export default sessionSlice.reducer;