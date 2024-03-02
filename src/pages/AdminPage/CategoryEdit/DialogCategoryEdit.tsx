import SelectCategoryImage from "@/components/SelectCategoryImage";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { SaveRounded } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import useCategoryEditForm from "./useCategoryEditForm";

type Props = {
  categoryToEdit: TypeCategory;
  onClose: () => void;
};

export default function DialogCategoryEdit({ categoryToEdit, onClose }: Props) {
  const {
    categoryImgUrl,
    onCategoryImgUrlChange,
    categoryName,
    onCategoryNameChange,
    isDisabled,
    onSubmit,
  } = useCategoryEditForm({
    categoryToEdit,
    onClose,
  });

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
                  onCategoryNameChange(e.target.value);
                }}
                value={categoryName}
              />
            </Grid>

            <Grid item xs={12}>
              <SelectCategoryImage
                onChange={onCategoryImgUrlChange}
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
