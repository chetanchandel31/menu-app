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
      <Grid
        container
        spacing={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item textAlign={"center"} xs={12} md={"auto"}>
          <img
            alt="category-img"
            src={category.categoryImgUrl}
            style={{ maxHeight: 200, maxWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12} md={"auto"}>
          <Grid
            container
            spacing={1}
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "start" }}
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

          <Typography
            color="text.secondary"
            sx={{ mt: 1, textAlign: { xs: "center", md: "left" } }}
            variant="body2"
          >
            <strong>Total menu items: </strong>
            {category.menuItems.length}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
