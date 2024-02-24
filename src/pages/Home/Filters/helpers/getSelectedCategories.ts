import useAppQueryParams from "@/hooks/useAppQueryParams";

type TypeQueryParams = ReturnType<typeof useAppQueryParams>[0];

export default function getSelectedCategories(queryParams: TypeQueryParams) {
  const selectedCategories: string[] = [];

  if (queryParams["selected-categories"]) {
    queryParams["selected-categories"].forEach((selectedCategory) => {
      if (typeof selectedCategory === "string")
        selectedCategories.push(selectedCategory);
    });
  }

  return selectedCategories;
}
