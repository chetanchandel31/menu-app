import SelectCategoryImage from "@/components/SelectCategoryImage";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import doesCategoryNameExist from "@/providers/CategoriesProvider/helpers/doesCategoryNameExist";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import { SaveRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

type Props = {
  categoryToEdit: TypeCategory;
  onClose: () => void;
};

export default function DialogCategoryEdit({ categoryToEdit, onClose }: Props) {
  const snackbar = useSnackbar();
  const { categories, dispatch } = useCategories();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [categoryName, setCategoryName] = useState(categoryToEdit.categoryName);
  const [categoryImgUrl, setCategoryImgUrl] = useState<string>(
    categoryToEdit.categoryImgUrl
  );

  const isDisabled = !categoryName || !hasUnsavedChanges;

  const handleCategoryUpdate = () => {
    const doesNameExist = doesCategoryNameExist(categoryName, categories);

    if (categoryName !== categoryToEdit.categoryName && doesNameExist) {
      snackbar.enqueueSnackbar("Category with this name already exists", {
        variant: "error",
      });
    } else {
      dispatch({
        type: "UPDATE-CATEGORY",
        payload: {
          categoryNameToUpdate: categoryToEdit.categoryName,
          updatedCategory: {
            categoryImgUrl,
            categoryName,
            menuItems: categoryToEdit.menuItems,
          },
        },
      });
      snackbar.enqueueSnackbar(`Category updated successfully`, {
        variant: "success",
      });
      onClose();
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      handleCategoryUpdate();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="xs">
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography fontWeight={700} variant="h6">
                Edit category
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoFocus
                name="category-name"
                label="Category name"
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                value={categoryName}
              />
            </Grid>

            <Grid item xs={12}>
              <SelectCategoryImage
                onChange={(categoryImg) => {
                  setCategoryImgUrl(categoryImg);
                  setHasUnsavedChanges(true);
                }}
                value={categoryImgUrl}
              />
            </Grid>

            <Grid item xs={12} textAlign={"right"}>
              <Button
                disabled={isDisabled}
                startIcon={<SaveRounded />}
                type="submit"
                variant="contained"
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
