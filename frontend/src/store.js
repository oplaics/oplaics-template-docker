import { configureStore } from "@reduxjs/toolkit";

/**
 * User Slices
 */
import userConfigReducer from "./store/reducers/user/userConfigReducer";

/**
 * App Slices
 */
import notifierReducer from "./store/reducers/app/notifierReducer";
import sessionReducer from "./store/reducers/app/sessionReducer";

/**
 * API Services
 */
import { authApi } from "./store/services/auth/AuthApi";

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
    session: sessionReducer,

    /**
     * API Services
     */
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
    ),
});

export default store;