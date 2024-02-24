import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import MuiThemeProvider from "./MuiThemeProvider";

export default function AllProviders({ children }: { children: ReactNode }) {
  return (
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </QueryParamProvider>
    </Router>
  );
}
