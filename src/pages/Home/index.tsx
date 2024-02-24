import CategoryName from "@/components/CategoryName";
import FoodMenuItem from "@/components/FoodMenuItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import { CATEGORY_MENU_ITEMS } from "@/utils/menuItems";
import { Box, Container, Grid } from "@mui/material";
import Fuse from "fuse.js";
import { useMemo } from "react";
import BrandName from "./BrandName";
import Filters from "./Filters";
import getSelectedCategories from "./Filters/helpers/getSelectedCategories";
import MenuItemsEmptyState from "./MenuItemsEmptyState";
import { getDeepCopy } from "@/utils/getDeepCopy";

type Props = {};

export default function Home({}: Props) {
  const [queryParams] = useAppQueryParams();
  const searchQuery = queryParams["search-query"] || "";

  // remove all unrelated to selected categories
  const categoryFilteredItems = useMemo(() => {
    let _categoryFilteredItems: typeof CATEGORY_MENU_ITEMS = [];
    const selectedCategories = getSelectedCategories(queryParams);

    if (selectedCategories.length > 0) {
      CATEGORY_MENU_ITEMS.forEach((category) => {
        if (selectedCategories.includes(category.categoryName)) {
          _categoryFilteredItems.push(category);
        }
      });
    } else {
      _categoryFilteredItems = CATEGORY_MENU_ITEMS;
    }

    return _categoryFilteredItems;
  }, [queryParams]);

  // filter `categoryFilteredItems` based on `searchQuery`
  const searchFilteredItems = useMemo(() => {
    let _filteredCategories: typeof CATEGORY_MENU_ITEMS = [];

    if (searchQuery) {
      categoryFilteredItems.forEach((category) => {
        const fuse = new Fuse(category.menuItems, {
          keys: ["menuItemName", "description"],
          threshold: 0.3,
        });
        const _filteredMenuItems = fuse
          .search(searchQuery)
          .map((result) => result.item);

        if (_filteredMenuItems.length > 0) {
          _filteredCategories.push({
            ...category,
            menuItems: _filteredMenuItems,
          });
        }
      });
    } else {
      _filteredCategories = categoryFilteredItems;
    }

    return _filteredCategories;
  }, [searchQuery, categoryFilteredItems]);

  // sort menu items in `searchFilteredItems`
  const sortedFilteredItems = useMemo(() => {
    let _sortedFilteredItems: typeof CATEGORY_MENU_ITEMS = [];
    const sortBy = queryParams["sort-by"];

    if (sortBy) {
      searchFilteredItems.forEach((category) => {
        const sortedMenuItems = getDeepCopy(category.menuItems).sort((a, b) => {
          const priceA = a.price || Infinity;
          const priceB = b.price || Infinity;

          if (sortBy === "price-high-to-low") {
            return priceB - priceA;
          } else if (sortBy === "price-low-to-high") {
            return priceA - priceB;
          }
          return 0;
        });

        _sortedFilteredItems.push({ ...category, menuItems: sortedMenuItems });
      });
    } else {
      _sortedFilteredItems = searchFilteredItems;
    }

    return _sortedFilteredItems;
  }, [queryParams, searchFilteredItems]);

  const categories: React.ReactNode[] = [];

  sortedFilteredItems.forEach((category, categoryIndex) => {
    categories.push(
      <Grid
        container
        direction={categoryIndex % 2 === 0 ? undefined : "row-reverse"}
        item
        xs={12}
        key={category.categoryName}
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
        boxShadow: "inset 0 0 0 100vmax rgba(0,0,0,.3)",
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
