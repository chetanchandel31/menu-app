import { useAuth } from "@/providers/AuthProvider/useAuth";
import { routes } from "@/routes/routes";
import { Button, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import BtnLogout from "./BtnLogout";

type Props = {};

export default function AuthButtons({}: Props) {
  const auth = useAuth();
  const location = useLocation();

  if (
    location.pathname === routes.auth_login.path ||
    location.pathname === routes.auth_signup.path
  ) {
    return null;
  }

  return auth.isLoggedIn ? (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={12} md="auto">
        <Typography
          component={"div"}
          color="text.secondary"
          textAlign={"center"}
          sx={{ lineHeight: 1.2 }}
          variant="caption"
        >
          Logged in as:
          <br /> admin@admin.com
        </Typography>
      </Grid>

      <Grid item xs={12} md="auto">
        <BtnLogout />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item>
        <Button component={Link} to={routes.auth_login.path}>
          Log In
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          to={routes.auth_signup.path}
          variant="contained"
        >
          Sign up
        </Button>
      </Grid>
    </Grid>
  );
}
