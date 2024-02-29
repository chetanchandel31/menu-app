import { TypeHeaderNavItem } from "@/types";
import { Button, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type Props = {
  headerNavItem: TypeHeaderNavItem;
};

export default function HeaderNavItem({ headerNavItem }: Props) {
  const theme = useTheme();
  const location = useLocation();

  const isSelected = location.pathname === headerNavItem.path;

  return (
    <Button
      component={Link}
      to={headerNavItem.path}
      color="inherit"
      fullWidth
      sx={{
        fontWeight: isSelected ? 700 : undefined,
        backgroundColor: isSelected ? theme.palette.action.focus : undefined,
        color: theme.palette.text.secondary,
      }}
    >
      {headerNavItem.name}
    </Button>
  );
}
