import { ENUM_SORT_BY } from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { getDeepCopy } from "@/utils/getDeepCopy";

type TypeMenuItems = TypeCategory["menuItems"];
type TypeSortBy = (typeof ENUM_SORT_BY)[keyof typeof ENUM_SORT_BY];

export default function getSortedMenuItems(
  menuItems: TypeMenuItems,
  sortBy: TypeSortBy
) {
  const sortedMenuItems = getDeepCopy(menuItems).sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;

    // 'based on availability' always at end
    if (priceA === undefined) {
      return 1;
    }
    if (priceB === undefined) {
      return -1;
    }

    // actual sorting
    if (sortBy === "price-high-to-low") {
      return priceB - priceA;
    } else if (sortBy === "price-low-to-high") {
      return priceA - priceB;
    }
    return 0;
  });

  return sortedMenuItems;
}
