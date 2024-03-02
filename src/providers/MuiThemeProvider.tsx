import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { red } from "@mui/material/colors";
import { ReactNode } from "react";

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = createTheme({
    palette: {
      // mode: "dark",
      primary: { main: red[700] },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          size: "small",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", boxShadow: "none" },
        },
      },
      MuiDialog: {
        defaultProps: { disableRestoreFocus: true, fullWidth: true },
      },
      MuiTooltip: { defaultProps: { arrow: true, placement: "top" } },
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
