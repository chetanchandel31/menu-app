import CategoryName from "@/components/CategoryName";
import FoodMenuItem from "@/components/FoodMenuItem";
import { CATEGORY_MENU_ITEMS } from "@/utils/menuItems";
import { Grid } from "@mui/material";

type Props = {
  category: (typeof CATEGORY_MENU_ITEMS)[number];
  categoryIndex: number;
};

export default function SingleCategory({ category, categoryIndex }: Props) {
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
            <CategoryName>{category.categoryName}</CategoryName>
          </Grid>

          {category.menuItems.map((menuItem) => (
            <Grid key={menuItem.menuItemName} item xs={12}>
              <FoodMenuItem
                description={menuItem.description}
                name={menuItem.menuItemName}
                price={menuItem.price}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <img
          src={category.categoryImgUrl}
          alt="category-img"
          style={{ maxWidth: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
