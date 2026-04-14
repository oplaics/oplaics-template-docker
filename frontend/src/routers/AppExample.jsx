/**
 * React
 */
import { lazy } from "react";

/**
 * Components
 */
const AuthProtect = lazy(() =>
  import("./../components/Routers/Routers").then((mod) => ({
    default: mod.AuthProtect,
  })),
);

/**
 * Routes
 */
const App = lazy(() => import("./../pages/app"));

const appRoutes = [
  {
    path: "app",
    element: (
      <AuthProtect>
        <App />
      </AuthProtect>
    ),
  },
];

export default appRoutes;