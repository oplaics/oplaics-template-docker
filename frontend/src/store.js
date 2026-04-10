import { configureStore } from "@reduxjs/toolkit";

/**
 * User Slices
 */
import userConfigReducer from "./store/reducers/user/userConfig";

const store = configureStore({
  reducer: {
    /**
     * User Slices
     */
    userConfig: userConfigReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // Add the API middlewares
    ),
});

export default store;