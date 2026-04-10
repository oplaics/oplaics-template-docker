import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notiText: '',
  notiStatus: '',
  notiVariant: 'success',
  notiErrors: {},
  notiKey: null,
};

export const notiferSlices = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    updateNotifer: (state, action) => {
      const { text, status, errors, variant = 'success' } = action.payload;

      state.notiText = text;
      state.notiStatus = status;
      state.notiVariant = variant;
      state.notiErrors = errors;
      state.notiKey = new Date().getTime();
    },
    resetNotifier: () => initialState,
  },
});

export default notiferSlices.reducer;

export const { updateNotistack, resetNotistack } = notiferSlices.actions;