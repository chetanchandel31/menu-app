import { CloseRounded, MenuRounded } from "@mui/icons-material";
import { Box, Button, Drawer, Grid, IconButton, useTheme } from "@mui/material";
import { useState } from "react";

type Props = { navItems: { name: string }[] };

export default function HeaderMenuBtnMobile({ navItems }: Props) {
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ ml: "auto" }}>
        <MenuRounded />
      </IconButton>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box component={"nav"} sx={{ width: 200 }}>
          <Box sx={{ p: 2, textAlign: "right" }}>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseRounded />
            </IconButton>
          </Box>

          <Grid container spacing={1}>
            {navItems.map((navItem) => (
              <Grid item xs={12} key={navItem.name}>
                <Button
                  fullWidth
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
        </Box>
      </Drawer>
    </>
  );
}
