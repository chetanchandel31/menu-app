import { Grid, Typography } from "@mui/material";
import FoodMenuItem from "./FoodMenuItem";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";

type Props = {
  category: TypeCategory;
  categoryIndex: number;
};

export default function SingleCategory({ category, categoryIndex }: Props) {
  let foodItems: React.ReactNode;
  if (category.menuItems.length === 0) {
    foodItems = (
      <Grid item xs={12}>
        <Typography sx={{ color: "#c2c2c2", py: 4 }} variant="body2">
          No food-items in this category yet
        </Typography>
      </Grid>
    );
  } else {
    foodItems = category.menuItems.map((menuItem) => (
      <Grid key={menuItem.menuItemName} item xs={12}>
        <FoodMenuItem
          description={menuItem.description}
          name={menuItem.menuItemName}
          price={menuItem.price}
        />
      </Grid>
    ));
  }

  return (
    <Grid
      container
      direction={categoryIndex % 2 === 0 ? undefined : "row-reverse"}
      item
      xs={12}
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              fontWeight={700}
              fontSize={40}
              sx={{
                color: "#fff",
                fontFamily: "trend-sans-w00-four,sans-serif",
              }}
              variant="h6"
            >
              {category.categoryName}
            </Typography>
          </Grid>

          {foodItems}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6} textAlign={"center"}>
        <img
          src={category.categoryImgUrl}
          alt="category-img"
          style={{ maxWidth: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
