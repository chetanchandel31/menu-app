import Header from "@/components/Header";
import { Box, Container, Grid } from "@mui/material";
import BrandName from "./BrandName";
import CategoryName from "@/components/CategoryName";
import FoodMenuItem from "@/components/FoodMenuItem";
import { CATEGORY_MENU_ITEMS } from "@/utils/menuItems";
import Footer from "@/components/Footer";

type Props = {};

export default function Home({}: Props) {
  const categories: React.ReactNode[] = [];

  CATEGORY_MENU_ITEMS.forEach((category, categoryIndex) => {
    categories.push(
      <Grid
        container
        direction={categoryIndex % 2 === 0 ? undefined : "row-reverse"}
        item
        xs={12}
        key={category.categoryName}
        spacing={1}
      >
        <Grid container spacing={3} item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
          <div style={{ color: "#fff" }}>2</div>
        </Grid>
      </Grid>
    );
  });

  return (
    <Box
      sx={{
        backgroundImage: "url('/background.png')",
        boxShadow: "inset 0 0 0 100vmax rgba(0,0,0,.3)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        overflow: "auto",
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ pb: 8 }}>
        <BrandName />

        {categories}
      </Container>

      <Footer />
    </Box>
  );
}
