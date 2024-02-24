import useIsMdDown from "@/hooks/useIsMdDown";
import { Box, Button, Grid, useTheme } from "@mui/material";
import HeaderMenuBtnMobile from "./HeaderMenuBtnMobile";
import { config } from "@/config";

type Props = {};

const navItems = [
  {
    name: "HOME",
  },
  {
    name: "HOSTELS",
  },
  {
    name: "ABOUT US",
  },
  {
    name: "CONTACT",
  },
  {
    name: "More",
  },
];

export default function Header({}: Props) {
  const theme = useTheme();

  const isMdDown = useIsMdDown();

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
          minHeight: 52,
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
          <Grid container spacing={2} justifyContent={"end"}>
            {navItems.map((navItem) => (
              <Grid item key={navItem.name}>
                <Button
                  color="inherit"
                  sx={{
                    fontWeight: navItem.name === "HOME" ? 700 : undefined,
                    backgroundColor:
                      navItem.name === "HOME"
                        ? theme.palette.action.focus
                        : undefined,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {navItem.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
