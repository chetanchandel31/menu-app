import { CloseRounded } from "@mui/icons-material";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import SelectCategories from "./SelectCategories";

type Props = { onClose: () => void; isOpen: boolean };

export default function FiltersDrawer({ onClose, isOpen }: Props) {
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <div>
        <Box sx={{ textAlign: "right" }}>
          <Tooltip title="Hide filters">
            <IconButton onClick={onClose}>
              <CloseRounded />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ maxWidth: 600, margin: "auto", py: 4, px: 2 }}>
          <SelectCategories />
        </Box>
      </div>
    </Drawer>
  );
}
