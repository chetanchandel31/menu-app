import { routes } from "@/routes/routes";
import { Grid, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogInForm from "./LogInForm";
import { Helmet } from "react-helmet";

type Props = {};

export default function LogIn({}: Props) {
  return (
    <>
      <Helmet>
        <title>Brand name | Log in</title>
      </Helmet>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography fontWeight={700} textAlign={"center"} variant="h6">
            Welcome back
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <LogInForm />
        </Grid>

        <Grid item xs={12}>
          <Typography color="text.secondary" textAlign={"center"}>
            Need an account?{" "}
            <MuiLink component={Link} to={routes.auth_signup.path}>
              Register
            </MuiLink>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
