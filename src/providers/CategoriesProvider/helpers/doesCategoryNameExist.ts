import { TypeCategory } from "../categories";

export default function doesCategoryNameExist(
  categoryName: string,
  totalCategories: TypeCategory[]
) {
  return (
    totalCategories.findIndex(
      (category) =>
        category.categoryName.toLowerCase() === categoryName.toLowerCase()
    ) !== -1
  );
}
