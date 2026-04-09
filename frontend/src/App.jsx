import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeConfig } from "./hooks/utils/useThemeConfig";

export default function App() {
  const themeConfig = useThemeConfig();

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <span id="top-anchor" />
      xd
    </ThemeProvider>
  )
}