import useAppQueryParams from "@/hooks/useAppQueryParams";
import Fuse from "fuse.js";
import { useMemo } from "react";
import getSelectedCategories from "./getSelectedCategories";
import getSortedMenuItems from "./getSortedMenuItems";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";

export default function useGetFilteredCategories() {
  const [queryParams] = useAppQueryParams();
  const { categories } = useCategories();

  // remove all categories unrelated to selected categories
  const categoryFilteredItems = useMemo(() => {
    let _categoryFilteredItems: TypeCategory[] = [];
    const selectedCategories = getSelectedCategories(queryParams);

    if (selectedCategories.length > 0) {
      categories.forEach((category) => {
        if (selectedCategories.includes(category.categoryName)) {
          _categoryFilteredItems.push(category);
        }
      });
    } else {
      _categoryFilteredItems = categories;
    }

    return _categoryFilteredItems;
  }, [queryParams, categories]);

  // filter `categoryFilteredItems` based on `searchQuery`
  const searchQuery = queryParams["search-query"] || "";

  const searchFilteredItems = useMemo(() => {
    let _filteredCategories: TypeCategory[] = [];

    if (searchQuery) {
      categoryFilteredItems.forEach((category) => {
        const fuse = new Fuse(category.menuItems, {
          keys: ["menuItemName"],
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
    let _sortedFilteredItems: TypeCategory[] = [];
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
