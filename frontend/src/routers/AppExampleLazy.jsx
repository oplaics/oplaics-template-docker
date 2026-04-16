/**
 * React
 */
import { lazy } from "react";

export const AuthProtectLazy = lazy(() =>
  import("../components/routers/Protects").then((mod) => ({
    default: mod.AuthProtect,
  })),
);

export const AppLazy = lazy(() => import("../pages/home/HomePage"));
