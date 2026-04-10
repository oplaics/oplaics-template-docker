import { createSlice } from "@reduxjs/toolkit";
import { readStorage, writeLocal } from "../../../components/utils/storage";

const initialState = {
  theme: readStorage("userConfig.theme", "light"),
};

export const userConfigSlice = createSlice({
  name: "userConfig",
  initialState,
  reducers: {
    updateUserConfig: (state, action) => {
      const { key, value, notSave } = action.payload;
      state[key] = value;
      !notSave && localStorage.setItem(`userConfig.${key}`, JSON.stringify(value));
    },
    updateTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      writeLocal('userConfig.theme', newTheme);
      window.dispatchEvent(new CustomEvent("leoEmails.customEvent.changeTheme", { detail: { newTheme } }));
    }
  },
});

export const { updateUserConfig, updateTheme } = userConfigSlice.actions;

export default userConfigSlice.reducer;