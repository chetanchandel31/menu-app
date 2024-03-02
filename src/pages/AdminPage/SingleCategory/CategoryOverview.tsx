import useAppQueryParams from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { EditRounded } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";

type Props = { category: TypeCategory };

export default function CategoryOverview({ category }: Props) {
  const theme = useTheme();
  const [, setQueryParams] = useAppQueryParams();

  return (
    <Box
      sx={{
        maxWidth: theme.breakpoints.values.sm,
        width: "100%",
        margin: "auto",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Typography fontWeight={700} variant="h6">
                {category.categoryName}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                onClick={() =>
                  setQueryParams({ "edit-category": category.categoryName })
                }
                startIcon={<EditRounded />}
                size="small"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} textAlign={"center"}>
          <img
            alt="category-img"
            src={category.categoryImgUrl}
            style={{ maxHeight: 300, maxWidth: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
