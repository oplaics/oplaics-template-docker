import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiText: '',
  notiStatus: '',
  notiVariant: 'success',
  notiKey: null,
};

export const notiferSlices = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    updateNotifer: (state, action) => {
      const { text, status, variant = 'success' } = action.payload;

      state.notiText = text;
      state.notiStatus = status;
      state.notiVariant = variant;
      state.notiKey = new Date().getTime();
    },
    resetNotifier: () => initialState,
  },
});

export default notiferSlices.reducer;

export const { updateNotifer, resetNotifier } = notiferSlices.actions;