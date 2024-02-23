import { Box, Button, Grid, useTheme } from "@mui/material";

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
] as const;

export default function Header({}: Props) {
  const theme = useTheme();

  return (
    <Box
      component={"nav"}
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: 52,
        display: "flex",
        alignItems: "center",
        px: { xs: 2, md: 12 },
        position: "sticky",
        top: 0,
      }}
    >
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
              // color={navItem.name === "Home" ? "primary" : "inherit"}
              // variant={navItem.name === "Home" ? "contained" : undefined}
            >
              {navItem.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}