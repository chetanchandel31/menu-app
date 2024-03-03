import { routes } from "@/routes/routes";
import { Grid, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import { Helmet } from "react-helmet";

type Props = {};

export default function SignUp({}: Props) {
  return (
    <>
      <Helmet>
        <title>Brand name | Sign up</title>
      </Helmet>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography fontWeight={700} textAlign={"center"} variant="h6">
            Create an account
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <SignUpForm />
        </Grid>

        <Grid item xs={12}>
          <Typography color="text.secondary" textAlign={"center"}>
            Already have an account?{" "}
            <MuiLink component={Link} to={routes.auth_login.path}>
              Log in
            </MuiLink>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
