/**
 * React
 */
import { Outlet } from "react-router-dom";

/**
 * Notistack
 */
import { SnackbarProvider } from "notistack";

/**
 * Redux
 */
import { Provider } from "react-redux";
import store from "../../store";

function AuthLayoutWrapper() {
  return <Outlet />;
}

export default function AuthLayout() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AuthLayoutWrapper />
      </SnackbarProvider>
    </Provider>
  );
}
