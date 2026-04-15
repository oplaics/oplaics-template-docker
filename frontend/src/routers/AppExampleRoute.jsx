import { AppLazy, AuthProtectLazy } from "./AppExampleLazy";

const appRoutes = [
  {
    path: "app",
    element: (
      <AuthProtectLazy>
        <AppLazy />
      </AuthProtectLazy>
    ),
  },
];

export default appRoutes;