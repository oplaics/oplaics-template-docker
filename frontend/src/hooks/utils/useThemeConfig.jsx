import { useEffect, useMemo, useState } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { readLocal } from "../../components/utils/storage";
import { themes } from "../../theme/themes";

export const useThemeConfig = () => {
  const initialMode = readLocal("userConfig.theme", "light");

  const [themeMode, setThemeMode] = useState(initialMode);

  useEffect(() => {
    function updateFromStorage() {
      const m = readLocal("userConfig.theme", "light");
      setThemeMode(m);
    }

    function onStorage(e) {
      console.log("Storage event", e);
      if (!e) {
        updateFromStorage();
        return;
      }
      if (e.key === "userConfig.theme" || e.key === null) {
        updateFromStorage();
      }
    }

    function onCustom() {
      updateFromStorage();
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("leoEmails.customEvent.changeTheme", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("leoEmails.customEvent.changeTheme", onCustom);
    };
  }, []);

  let themeConfig = useMemo(
    () => {
      const theme = createTheme({
        typography: {
          fontFamily: ["Inter", "sans-serif", "Noto Color Emoji"].join(","),
        },
        palette: {
          mode: themeMode,
          ...(themes[themeMode] || themes.light),
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                borderRadius: "8px 8px 0 0",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiStepIcon: {
            styleOverrides: {
              root: {
                fontSize: "30px",
              },
            },
          },
          MuiStepConnector: {
            styleOverrides: {
              root: {
                marginLeft: "15px",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                borderRadius: 8,
                textTransform: "none",
                fontSize: 16,
                lineHeight: 1.5,
                fontFamily: ["Nunito", "sans-serif"].join(","),
                "&:hover": {
                  boxShadow: "none",
                },
              },
            },
          },
        },
      });
      
      return responsiveFontSizes(theme);
    },
    [themeMode],
  );

  return themeConfig;
};