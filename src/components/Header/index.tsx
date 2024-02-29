import useIsMdDown from "@/hooks/useIsMdDown";
import { Box, Grid, useTheme } from "@mui/material";
import HeaderMenuBtnMobile from "./HeaderMenuBtnMobile";
import { config } from "@/config";
import AuthButtons from "./AuthButtons";
import { routes } from "@/routes/routes";
import { TypeHeaderNavItem } from "@/types";
import { useAuth } from "@/providers/AuthProvider/useAuth";
import HeaderNavItem from "./HeaderNavItem";

type Props = {};

const navItems: TypeHeaderNavItem[] = [
  {
    name: "HOME",
    path: routes.home.path,
  },
  {
    name: "MENU",
    path: routes.menu.path,
  },
];

export default function Header({}: Props) {
  const theme = useTheme();
  const isMdDown = useIsMdDown();
  const auth = useAuth();

  if (auth.isLoggedIn) {
    // ideally should check for user's role instead of just `isLoggedIn`
    navItems.push({
      name: "ADMIN",
      path: routes.home.path,
    });
  }

  return (
    <Box
      component={"nav"}
      sx={{
        backgroundColor: theme.palette.background.default,
        position: "sticky",
        top: 0,
        zIndex: 800,
      }}
    >
      <Box
        sx={{
          minHeight: config.HEADER_MIN_HEIGHT,
          margin: "auto",
          width: "100%",
          maxWidth: config.HEADER_FOOTER_MAX_WIDTH,
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        {isMdDown ? (
          <HeaderMenuBtnMobile navItems={navItems} />
        ) : (
          <Grid
            container
            spacing={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <Grid container spacing={2}>
                {navItems.map((navItem) => (
                  <Grid item key={navItem.name}>
                    <HeaderNavItem headerNavItem={navItem} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item>
              <AuthButtons />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
