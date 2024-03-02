import useAppQueryParams from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { CloseRounded, EditRounded } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";

type Props = {
  menuItem: TypeCategory["menuItems"][number];
};

export default function MenuItemButtons({ menuItem }: Props) {
  const [, setQueryParams] = useAppQueryParams();

  return (
    <Grid container spacing={1} justifyContent={"end"}>
      <Grid item>
        <Tooltip
          title="Edit menu item"
          onClick={() => {
            setQueryParams({ "edit-menu-item": menuItem.menuItemName });
          }}
        >
          <IconButton size="small">
            <EditRounded />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip title="Remove menu item">
          <IconButton color="error" size="small">
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
