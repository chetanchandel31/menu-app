import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Container, Grid } from "@mui/material";
import BrandName from "./BrandName";
import Filters from "./Filters";
import useGetFilteredCategories from "./Filters/helpers/useGetFilteredCategories";
import MenuItemsEmptyState from "./MenuItemsEmptyState";
import SingleCategory from "./SingleCategory";
import { Helmet } from "react-helmet";

type Props = {};

export default function MenuPage({}: Props) {
  const filteredItems = useGetFilteredCategories();

  const categories: React.ReactNode[] = [];

  filteredItems.forEach((category, categoryIndex) => {
    categories.push(
      <Grid key={category.categoryName} item xs={12}>
        <SingleCategory category={category} categoryIndex={categoryIndex} />
      </Grid>
    );
  });

  if (categories.length === 0) {
    categories.push(
      <Grid item xs={12} key="empty-state">
        <MenuItemsEmptyState />
      </Grid>
    );
  }

  return (
    <>
      <Helmet>
        <title>Brand name | Menu</title>
      </Helmet>

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
              <Box sx={{ py: 5 }}>
                <BrandName />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Filters />
            </Grid>

            <Grid container item xs={12} spacing={3}>
              {categories}
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </Box>
    </>
  );
}
