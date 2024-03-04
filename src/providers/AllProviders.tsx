import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import MuiThemeProvider from "./MuiThemeProvider";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./AuthProvider";
import { ConfirmProvider } from "material-ui-confirm";
import CategoriesProvider from "./CategoriesProvider";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import isTouchDevice from "@/utils/isTouchDevice";

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

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
              <AuthProvider>
                <CategoriesProvider>
                  <DndProvider backend={backendForDND}>{children}</DndProvider>
                </CategoriesProvider>
              </AuthProvider>
            </ConfirmProvider>
          </MuiThemeProvider>
        </QueryParamProvider>
      </Router>
    </SnackbarProvider>
  );
}
