import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeConfig } from "./hooks/utils/useThemeConfig";
import Router from "./Router";

export default function App() {
  const themeConfig = useThemeConfig();

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <span id="top-anchor" />
      <Router />
    </ThemeProvider>
  )
}