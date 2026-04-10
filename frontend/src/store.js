import { configureStore } from "@reduxjs/toolkit";

/**
 * User Slices
 */
import userConfigReducer from "./store/reducers/user/userConfigReducer";

/**
 * App Slices
 */
import notifierReducer from "./store/reducers/app/notifierReducer";

const store = configureStore({
  reducer: {
    /**
     * User Slices
     */
    userConfig: userConfigReducer,

    /**
     * App Slices
     */
    notifier: notifierReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // Add the API middlewares
    ),
});

export default store;