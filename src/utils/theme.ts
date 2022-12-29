import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8B008B",
      light: "#d000d0",
      dark: "",
    },
    secondary: {
      main: "#ffc107",
      light: "#ffd558",
      dark: "",
    },
    error: {
      main: "#FF5252",
    },
    text: {
      primary: "#212121",
      secondary: "#000",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "Open Sans",
    fontSize: 14,
    h1: {
      fontSize: "5rem",
      lineHeight: 1.167,
      color: "#212121",
    },
    h2: {
      fontSize: "3.25rem",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2.5rem",
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "2rem",
      lineHeight: 1.32,
    },
    h5: {
      fontSize: "1.375rem",
      lineHeight: 1.334,
    },
    h6: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  // shadows,
  // customShadows
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1A1A1B",
    },
    primary: {
      main: "#1A1A1B",
      light: "#1A1A1B",
      dark: "#1A1A1B",
    },
    secondary: {
      main: "#1A1A1B",
      light: "#1A1A1B",
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
  typography: {
    htmlFontSize: 18,
    fontFamily: "Poppins",
    fontSize: 18,
    h1: {
      fontSize: "1.75rem",
      lineHeight: 1.167,
      color: "#ffffff",
    },
    h2: {
      fontSize: "1.40rem",
      lineHeight: 1.2,
      color: "#ffffff",
    },
    h3: {
      fontSize: "1.25rem",
      lineHeight: 1.3,
      color: "#ffffff",
    },
    h4: {
      fontSize: "0.990rem",
      lineHeight: 1.32,
      color: "#ffffff",
    },
    h5: {
      fontSize: "0.950rem",
      lineHeight: 1.334,
      color: "#ffffff",
    },
    h6: {
      fontSize: "0.900rem",
      lineHeight: 1.6,
      color: "#ffffff",
    },
    subtitle1: {
      fontSize: "0.860rem",
      lineHeight: 1.75,
      color: "#ffffff",
    },
    subtitle2: {
      fontSize: "0.830rem",
      lineHeight: 1.57,
      color: "#ffffff",
    },
    body1: {
      fontSize: "0.900rem",
      lineHeight: 1.6,
      color: "#ffffff",
    },
    body2: {
      fontSize: "0.850rem",
      lineHeight: 1.5,
      color: "#ffffff",
    },
    caption: {
      fontSize: "0.775rem",
      lineHeight: 1.43,
      color: "#ffffff",
    },
  },
  components: {
    // MuiCard: {
    //     styleOverrides: {
    //         root: sx({
    //             backgroundColor: '#082b47',
    //         })
    //     }
    // }
  },
  shape: { borderRadius: 8 },
  // shadows,
  // customShadows
});
export function getTheme(mode: "light" | "dark") {
  return mode === "light" ? lightTheme : darkTheme;
}
