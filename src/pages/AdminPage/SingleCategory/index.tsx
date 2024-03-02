import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { routes } from "@/routes/routes";
import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryOverview from "./CategoryOverview";

type Props = { category: TypeCategory };

export default function SingleCategory({ category }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          component={Link}
          to={routes.admin.path}
          size="small"
          startIcon={<ArrowBackRounded />}
        >
          Categories
        </Button>
      </Grid>

      <Grid item xs={12}>
        <CategoryOverview category={category} />
      </Grid>
    </Grid>
  );
}
