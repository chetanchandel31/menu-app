import { routes } from "@/routes/routes";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function SideMenuContent({}: Props) {
  const theme = useTheme();

  const location = useLocation();

  const listItems: React.ReactNode[] = [];
  Object.entries(routes).forEach(([, { path, name }]) => {
    const isSelected = path === location.pathname;

    listItems.push(
      <ListItem
        key={path}
        component={Link}
        to={path}
        disablePadding
        style={{ marginBottom: theme.spacing(1) }}
      >
        <ListItemButton
          selected={isSelected}
          style={{ borderRadius: theme.spacing(1) }}
        >
          <ListItemText
            primary={
              <Typography
                fontWeight={isSelected ? 700 : undefined}
                variant="body2"
              >
                {name}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <div
      style={{
        padding: theme.spacing(5, 1),
      }}
    >
      <List>{listItems}</List>
    </div>
  );
}
