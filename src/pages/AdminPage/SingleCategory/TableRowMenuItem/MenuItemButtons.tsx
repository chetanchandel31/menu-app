import useAppQueryParams from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import {
  CloseRounded,
  EditRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

type Props = {
  menuItem: TypeCategory["menuItems"][number];
};

export default function MenuItemButtons({ menuItem }: Props) {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const [queryParams, setQueryParams] = useAppQueryParams();
  const confirm = useConfirm();

  const { dispatch } = useCategories();

  const onDelete = ({
    menuItemName,
    categoryName,
  }: {
    menuItemName: string;
    categoryName: string;
  }) => {
    confirm({
      title: (
        <Typography
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
          }}
          variant="h6"
        >
          <ErrorOutlineRounded />
          Delete menu item?
        </Typography>
      ),
      description: (
        <>
          Are you sure, you want to delete{" "}
          {menuItemName ? <strong>{menuItemName}</strong> : `this menu item`}?
        </>
      ),
      confirmationText: "Delete menu item",
    })
      .then(async () => {
        dispatch({
          type: "DELETE_MENU_ITEM",
          payload: { categoryName, menuItemName },
        });
        snackbar.enqueueSnackbar(`"${menuItemName}" deleted`, {
          variant: "info",
        });
      })
      .catch(() => console.log("#uey34874937"));
  };

  return (
    <Grid container spacing={1} justifyContent={"end"} wrap="nowrap">
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
          <IconButton
            color="error"
            onClick={() => {
              if (queryParams["category"]) {
                onDelete({
                  categoryName: queryParams["category"],
                  menuItemName: menuItem.menuItemName,
                });
              }
            }}
            size="small"
          >
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
