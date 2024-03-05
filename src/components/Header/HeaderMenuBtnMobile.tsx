import { CloseRounded, MenuRounded } from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import AuthButtons from "./AuthButtons";
import { TypeHeaderNavItem } from "@/types";
import HeaderNavItem from "./HeaderNavItem";

type Props = { navItems: TypeHeaderNavItem[] };

export default function HeaderMenuBtnMobile({ navItems }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ ml: "auto" }}>
        <MenuRounded />
      </IconButton>

      <Drawer
        anchor="left"
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
                <HeaderNavItem headerNavItem={navItem} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ py: 5 }}>
            <AuthButtons />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
