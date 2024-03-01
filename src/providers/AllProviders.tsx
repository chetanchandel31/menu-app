import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import MuiThemeProvider from "./MuiThemeProvider";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./AuthProvider";
import { ConfirmProvider } from "material-ui-confirm";

export default function AllProviders({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={5000}
      preventDuplicate
      maxSnack={6}
    >
      <Router>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <MuiThemeProvider>
            <ConfirmProvider
              defaultOptions={{
                confirmationButtonProps: {
                  color: "error",
                  variant: "contained",
                },
                dialogActionsProps: {
                  style: {
                    justifyContent: "space-between",
                  },
                },
                dialogProps: {
                  maxWidth: "xs",
                },
              }}
            >
              <AuthProvider>{children}</AuthProvider>
            </ConfirmProvider>
          </MuiThemeProvider>
        </QueryParamProvider>
      </Router>
    </SnackbarProvider>
  );
}
