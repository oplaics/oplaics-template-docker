/**
 * React
 */
import { Outlet } from "react-router-dom";

/**
 * Redux
 */
import { Provider } from "react-redux";
import store from "../../store";

function DefaultLayoutWrapper() {
  return <Outlet />;
}

export default function DefaultLayout() {
  return (
    <Provider store={store}>
      <DefaultLayoutWrapper />
    </Provider>
  );
}
