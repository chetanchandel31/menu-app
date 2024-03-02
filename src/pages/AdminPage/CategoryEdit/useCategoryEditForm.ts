import useAppQueryParams from "@/hooks/useAppQueryParams";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import doesCategoryNameExist from "@/providers/CategoriesProvider/helpers/doesCategoryNameExist";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import { useSnackbar } from "notistack";
import { useState } from "react";

type Params = {
  categoryToEdit: TypeCategory;
  onClose: () => void;
};

export default function useCategoryEditForm({
  categoryToEdit,
  onClose,
}: Params) {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const snackbar = useSnackbar();
  const { categories, dispatch } = useCategories();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [categoryName, setCategoryName] = useState(categoryToEdit.categoryName);
  const [categoryImgUrl, setCategoryImgUrl] = useState<string>(
    categoryToEdit.categoryImgUrl
  );

  const onCategoryNameChange = (categoryName: string) => {
    setCategoryName(categoryName);
    setHasUnsavedChanges(true);
  };

  const onCategoryImgUrlChange = (categoryImg: string) => {
    setCategoryImgUrl(categoryImg);
    setHasUnsavedChanges(true);
  };

  const isDisabled = !categoryName || !hasUnsavedChanges;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // guard clauses
    if (isDisabled) {
      return;
    }
    const doesNameExist = doesCategoryNameExist(categoryName, categories);
    if (categoryName !== categoryToEdit.categoryName && doesNameExist) {
      return snackbar.enqueueSnackbar(
        "Category with this name already exists",
        {
          variant: "error",
        }
      );
    }

    // update category
    dispatch({
      type: "UPDATE-CATEGORY",
      payload: {
        categoryNameToUpdate: categoryToEdit.categoryName,
        updatedCategory: {
          categoryImgUrl,
          categoryName,
          menuItems: categoryToEdit.menuItems,
        },
      },
    });

    if (queryParams["category"]) {
      // so we don't get 404 page if single category page is opened
      setQueryParams({ category: categoryName });
    }

    snackbar.enqueueSnackbar(`Category updated successfully`, {
      variant: "success",
    });
    onClose();
  };

  return {
    isDisabled,
    onSubmit,
    onCategoryNameChange,
    onCategoryImgUrlChange,
    categoryName,
    categoryImgUrl,
  };
}
