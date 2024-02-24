import { ENUM_SORT_BY } from "@/hooks/useAppQueryParams";
import { getDeepCopy } from "@/utils/getDeepCopy";
import { CATEGORY_MENU_ITEMS } from "@/utils/menuItems";

type TypeMenuItems = (typeof CATEGORY_MENU_ITEMS)[number]["menuItems"];
type TypeSortBy = (typeof ENUM_SORT_BY)[keyof typeof ENUM_SORT_BY];

export default function getSortedMenuItems(
  menuItems: TypeMenuItems,
  sortBy: TypeSortBy
) {
  const sortedMenuItems = getDeepCopy(menuItems).sort((a, b) => {
    const priceA = a.price || Infinity;
    const priceB = b.price || Infinity;

    if (sortBy === "price-high-to-low") {
      return priceB - priceA;
    } else if (sortBy === "price-low-to-high") {
      return priceA - priceB;
    }
    return 0;
  });

  return sortedMenuItems;
}
