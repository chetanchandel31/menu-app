import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import SingleCategory from "@/pages/Home/SingleCategory";
import { Box, Container, Grid } from "@mui/material";
import BrandName from "./BrandName";
import Filters from "./Filters";
import useGetFilteredCategories from "./Filters/helpers/useGetFilteredCategories";
import MenuItemsEmptyState from "./MenuItemsEmptyState";

type Props = {};

export default function Home({}: Props) {
  const [queryParams] = useAppQueryParams();
  const searchQuery = queryParams["search-query"] || "";

  const filteredItems = useGetFilteredCategories();

  const categories: React.ReactNode[] = [];

  filteredItems.forEach((category, categoryIndex) => {
    categories.push(
      <SingleCategory
        key={category.categoryName}
        category={category}
        categoryIndex={categoryIndex}
      />
    );
  });

  if (searchQuery && categories.length === 0) {
    categories.push(
      <Grid item xs={12} key="empty-state">
        <MenuItemsEmptyState />
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: "url('/background.png')",
        boxShadow: "inset 0 0 0 100vmax rgba(0,0,0,.5)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        overflow: "auto",
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ pb: 12, minHeight: "90vh" }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <BrandName />
          </Grid>

          <Grid item xs={12}>
            <Filters />
          </Grid>

          <Grid item xs={12}>
            {categories}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
