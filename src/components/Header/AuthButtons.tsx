import { useAuth } from "@/providers/AuthProvider/useAuth";
import { routes } from "@/routes/routes";
import { LogoutRounded } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {};

export default function AuthButtons({}: Props) {
  const auth = useAuth();

  return auth.isLoggedIn ? (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={12} md="auto">
        <Typography
          component={"div"}
          color="text.secondary"
          textAlign={"center"}
          sx={{ lineHeight: 1.2 }}
          onClick={() => auth.removeAuthorizedUser()}
          variant="caption"
        >
          Logged in as:
          <br /> admin@admin.com
        </Typography>
      </Grid>

      <Grid item xs={12} md="auto">
        <Button
          color="error"
          fullWidth
          startIcon={<LogoutRounded />}
          size="small"
        >
          Logout
        </Button>
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
