import SelectCategoryImage from "@/components/SelectCategoryImage";
import { CATEGORY_IMAGES } from "@/providers/CategoriesProvider/categories";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
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
  onClose: () => void;
};

export default function DialogCategoryCreate({ onClose }: Props) {
  const snackbar = useSnackbar();
  const { dispatch } = useCategories();

  const [categoryName, setCategoryName] = useState("");

  const [categoryImgUrl, setCategoryImgUrl] = useState<string>(
    CATEGORY_IMAGES["chopstick-item"]
  );

  const isDisabled = !categoryName;

  const handleCategoryCreate = () => {
    dispatch({
      type: "ADD-CATEGORY",
      payload: {
        categoryName,
        categoryImgUrl,
        menuItems: [],
      },
      onFinish: (type, message) => {
        if (type === "error") {
          snackbar.enqueueSnackbar(message, { variant: "error" });
        }
        if (type === "success") {
          snackbar.enqueueSnackbar(message, { variant: "success" });
          onClose();
        }
      },
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      handleCategoryCreate();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="xs">
      <DialogContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography fontWeight={700} variant="h6">
                Create category
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoFocus
                name="category-name"
                label="Category name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <SelectCategoryImage
                onChange={(categoryImg) => setCategoryImgUrl(categoryImg)}
                value={categoryImgUrl}
              />
            </Grid>

            <Grid item xs={12} textAlign={"right"}>
              <Button disabled={isDisabled} type="submit" variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
