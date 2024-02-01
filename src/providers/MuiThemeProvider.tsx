import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = createTheme({
    palette: {
      // mode: "dark",
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none" },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
