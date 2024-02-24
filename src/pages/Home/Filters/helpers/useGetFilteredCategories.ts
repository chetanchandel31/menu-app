import useAppQueryParams from "@/hooks/useAppQueryParams";
import { CATEGORY_MENU_ITEMS } from "@/utils/menuItems";
import Fuse from "fuse.js";
import { useMemo } from "react";
import getSelectedCategories from "./getSelectedCategories";
import getSortedMenuItems from "./getSortedMenuItems";

export default function useGetFilteredCategories() {
  const [queryParams] = useAppQueryParams();

  // remove all categories unrelated to selected categories
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
  const searchQuery = queryParams["search-query"] || "";

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
        const sortedMenuItems = getSortedMenuItems(category.menuItems, sortBy);

        _sortedFilteredItems.push({ ...category, menuItems: sortedMenuItems });
      });
    } else {
      _sortedFilteredItems = searchFilteredItems;
    }

    return _sortedFilteredItems;
  }, [queryParams, searchFilteredItems]);

  return sortedFilteredItems;
}
