import useForm from "@/hooks/useForm";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { schemaMenuItemFormData } from "../MenuItemForm/schemaMenuItemFormData";
import MenuItemForm from "../MenuItemForm";
import { SaveRounded } from "@mui/icons-material";
import doesMenuItemNameExistInCategory from "../helpers/doesMenuItemNameExistInCategory";

type Props = {
  category: TypeCategory;
  menuItem: TypeCategory["menuItems"][number];
  onClose: () => void;
};

export default function DialogMenuItemEdit({
  category,
  menuItem,
  onClose,
}: Props) {
  const snackbar = useSnackbar();
  const { dispatch } = useCategories();

  const { formData, setFormData, getSubmitHandler, errors, isSubmitDisabled } =
    useForm({
      zodValidator: schemaMenuItemFormData,
      initialData: {
        description: menuItem.description,
        menuItemName: menuItem.menuItemName,
        price: menuItem.price ?? null,
      },
    });

  const onSubmit = getSubmitHandler(async (_formData) => {
    const doesNameExist = doesMenuItemNameExistInCategory(
      formData.menuItemName,
      category
    );

    if (doesNameExist && formData.menuItemName !== menuItem.menuItemName) {
      snackbar.enqueueSnackbar("Menu item with this name already exists", {
        variant: "error",
      });

      return { isSuccess: false };
    }

    dispatch({
      type: "UPDATE_MENU_ITEM",
      payload: {
        categoryName: category.categoryName,
        menuItemName: menuItem.menuItemName,
        updatedMenuItem: {
          description: formData.description,
          menuItemName: formData.menuItemName,
          price: formData.price ?? undefined,
        },
      },
    });
    snackbar.enqueueSnackbar(`New Menu item added: ${formData.menuItemName}`, {
      variant: "success",
    });
    onClose();

    return { isSuccess: true };
  });

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography fontWeight={700} variant="h6">
                Edit menu item
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <MenuItemForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item>
                  <Button color="error" onClick={onClose}>
                    Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    disabled={isSubmitDisabled}
                    startIcon={<SaveRounded />}
                    type="submit"
                    sx={{ minWidth: 120 }}
                    variant="contained"
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
