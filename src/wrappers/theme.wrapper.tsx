import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
//
import { getTheme } from "../utils/theme";

// ----------------------------------------------------------------------

export default function ThemeWrapper({ children }: any) {
  const themeOptions = useMemo(
    () => ({
      palette: {
        mode: "dark",
        background: {
          default: "#22303C",
        },
        primary: {
          main: "#22303C",
          light: "#7f7f7f",
          dark: "#7f7f7f",
        },
        secondary: {
          main: "#ffc107",
          light: "#ffd558",
          dark: "#7f7f7f",
        },
        error: {
          main: "#FF5252",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cccc",
        },
      },
    }),
    []
  );

  const theme = createTheme(themeOptions as any);
  // theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={getTheme("dark")}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
