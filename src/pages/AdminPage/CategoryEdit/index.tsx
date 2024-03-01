import useAppQueryParams from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import DialogCategoryEdit from "./DialogCategoryEdit";

type Props = {};

export default function CategoryEdit({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const { categories } = useCategories();

  let categoryToEdit: TypeCategory | null = null;
  if (queryParams["edit-category"]) {
    const categoryIndex = categories.findIndex(
      (category) => category.categoryName === queryParams["edit-category"]
    );

    if (categoryIndex !== -1) {
      categoryToEdit = categories[categoryIndex] || null;
    }
  }

  return (
    <>
      {categoryToEdit ? (
        <DialogCategoryEdit
          categoryToEdit={categoryToEdit}
          onClose={() => setQueryParams({ "edit-category": null })}
        />
      ) : null}
    </>
  );
}
