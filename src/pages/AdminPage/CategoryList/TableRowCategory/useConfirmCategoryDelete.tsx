import useAppQueryParams from "@/hooks/useAppQueryParams";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";

export default function useConfirmCategoryDelete() {
  const theme = useTheme();
  const confirm = useConfirm();
  const { dispatch } = useCategories();
  const snackbar = useSnackbar();
  const [, setQueryParams] = useAppQueryParams();

  const handleDelete = ({ categoryName }: { categoryName: string }) => {
    dispatch({
      type: "DELETE-CATEGORY",
      payload: { categoryName },
    });
    setQueryParams({ category: null });
    snackbar.enqueueSnackbar(`"${categoryName}" deleted`, {
      variant: "info",
    });
  };

  const onDelete = ({ categoryName }: { categoryName: string }) => {
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
          Delete category?
        </Typography>
      ),
      description: (
        <>
          Delete{" "}
          {categoryName ? <strong>{categoryName}</strong> : `this category`}?
          This will delete any menu items within this category as well.
        </>
      ),
      confirmationText: "Delete category",
    })
      .then(async () => {
        handleDelete({ categoryName });
      })
      .catch(() => console.log("#shu298029"));
  };

  return { onDelete };
}
