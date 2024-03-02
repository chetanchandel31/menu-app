import SelectCategoryImage from "@/components/SelectCategoryImage";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import { CATEGORY_IMAGES } from "@/providers/CategoriesProvider/categories";
import doesCategoryNameExist from "@/providers/CategoriesProvider/helpers/doesCategoryNameExist";
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
  const [, setQueryParams] = useAppQueryParams();
  const { categories, dispatch } = useCategories();

  const [categoryName, setCategoryName] = useState("");

  const [categoryImgUrl, setCategoryImgUrl] = useState<string>(
    CATEGORY_IMAGES["chopstick-item"]
  );

  const isDisabled = !categoryName;

  const handleCategoryCreate = () => {
    const doesNameExist = doesCategoryNameExist(categoryName, categories);

    if (doesNameExist) {
      snackbar.enqueueSnackbar("Category with this name already exists", {
        variant: "error",
      });
    } else {
      dispatch({
        type: "ADD-CATEGORY",
        payload: {
          categoryName,
          categoryImgUrl,
          menuItems: [],
        },
      });
      snackbar.enqueueSnackbar(`New category created: ${categoryName}`, {
        variant: "success",
      });
      onClose();
      setQueryParams({ category: categoryName });
    }
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
                value={categoryName}
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
