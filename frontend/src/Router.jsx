/**
 * React
 */
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**
 * Components
 */
import Fallback from "./components/routers/Fallback";
import ErrorFallback from "./components/routers/ErrorFallback";
const NoSeeAuth = lazy(() =>
  import("./components/routers/Protects").then((mod) => ({
    default: mod.NoSeeAuth,
  })),
);
const AuthProtect = lazy(() =>
  import("./components/routers/Protects").then((mod) => ({
    default: mod.AuthProtect,
  })),
);

/**
 * Layouts
 */
const DefaultLayout = lazy(() => import("./components/routers/DefaultLayout"));
const AuthLayout = lazy(() => import("./components/routers/AuthLayout"));

/**
 * Pages
 */
const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPage = lazy(() => import("./pages/auth/ForgotPage"));
const TFAPage = lazy(() => import("./pages/auth/TFAPage"));
const LogoutPage = lazy(() => import("./pages/auth/LogoutPage"));

/**
 * Apps Routes
 */
// import appRoutes from "./routers/AppExample";

const router = createBrowserRouter([
  /* Branch Auth */
  {
    path: "/auth",
    errorElement: <ErrorFallback />,
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: (
          <NoSeeAuth>
            <LoginPage />
          </NoSeeAuth>
        ),
      },
      {
        path: "register",
        element: (
          <NoSeeAuth>
            <RegisterPage />
          </NoSeeAuth>
        ),
      },
      {
        path: "forgot",
        element: (
          <NoSeeAuth>
            <ForgotPage />
          </NoSeeAuth>
        ),
      },
      {
        path: "2fa",
        element: (
          <AuthProtect>
            <TFAPage />
          </AuthProtect>
        ),
      },
      {
        path: "logout",
        element: (
          <AuthProtect>
            <LogoutPage />
          </AuthProtect>
        ),
      },
      {
        path: "*",
        element: <Fallback text="Página no encontrada" homeButton />,
      },
    ],
  },

  /* Branch Privado */
  {
    path: "/",
    errorElement: <ErrorFallback />,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthProtect>
            <HomePage />
          </AuthProtect>
        ),
      },
      // ...appRoutes,
      {
        path: "*",
        element: <Fallback text="Página no encontrada" homeButton />,
      },
    ],
  },
]);

export default function Router() {
  return (
    <Suspense
      fallback={
        <Fallback
          text="Estamos cargando algunas cosas, por favor espere..."
          loading
        />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
