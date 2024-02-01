import { routes } from "@/routes/routes";
import { Card, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

type Props = {};

export default function AuthForm({}: Props) {
  const location = useLocation();
  const isSignUp = location.pathname === routes.auth_signup.path;

  return (
    <Container sx={{ py: 5 }}>
      <Card sx={{ maxWidth: 500, margin: "auto", p: 2 }} variant="outlined">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography fontWeight={700} textAlign={"center"} variant="h6">
              {isSignUp ? "Create an account" : "Welcome back"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {/*  */}
          </Grid>

          <Grid item xs={12}>
            <LoadingButton fullWidth variant="contained">
              {isSignUp ? "Continue" : "Log In"}
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            {isSignUp
              ? "Already have an account?"
              : "Need an account? Register"}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
