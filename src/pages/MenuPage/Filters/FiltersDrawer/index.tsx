import { CloseRounded } from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Tooltip } from "@mui/material";
import SelectCategories from "./SelectCategories";
import SortBy from "./SortBy";

type Props = { onClose: () => void; isOpen: boolean };

export default function FiltersDrawer({ onClose, isOpen }: Props) {
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <div>
        <Box sx={{ textAlign: "right" }}>
          <Tooltip title="Hide filters">
            <IconButton onClick={onClose} sx={{ m: 1 }}>
              <CloseRounded />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ maxWidth: 600, margin: "auto", px: 2, pb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SelectCategories />
            </Grid>

            <Grid item xs={12}>
              <SortBy />
            </Grid>
          </Grid>
        </Box>
      </div>
    </Drawer>
  );
}
