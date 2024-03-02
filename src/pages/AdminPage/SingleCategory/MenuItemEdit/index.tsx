import useAppQueryParams from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import DialogMenuItemEdit from "./DialogMenuItemEdit";

type Props = {};

export default function MenuItemEdit({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();

  const { categories } = useCategories();

  let selectedCategory: TypeCategory | null = null;
  let menuItemToEdit: TypeCategory["menuItems"][number] | null = null;

  if (queryParams["edit-menu-item"]) {
    for (const category of categories) {
      if (category.categoryName === queryParams["category"]) {
        selectedCategory = category;

        for (const menuItem of category.menuItems) {
          if (menuItem.menuItemName === queryParams["edit-menu-item"]) {
            menuItemToEdit = menuItem;

            break;
          }
        }

        break;
      }
    }
  }

  return (
    <>
      {menuItemToEdit && selectedCategory ? (
        <DialogMenuItemEdit
          category={selectedCategory}
          menuItem={menuItemToEdit}
          onClose={() => setQueryParams({ "edit-menu-item": null })}
        />
      ) : null}
    </>
  );
}
