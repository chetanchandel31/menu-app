import { TypeCategory } from "@/providers/CategoriesProvider/categories";

export default function doesMenuItemNameExistInCategory(
  menuItemName: string,
  category: TypeCategory
) {
  return (
    category.menuItems.findIndex(
      (menuItem) =>
        menuItem.menuItemName.toLowerCase() === menuItemName.toLowerCase()
    ) !== -1
  );
}
