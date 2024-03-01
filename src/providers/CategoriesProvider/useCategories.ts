import { useContext } from "react";
import { createContext } from "react";
import { TypeCategory } from "./categories";
import { TypeCategoriesAction } from "./helpers/categoriesReducer";

type TypeCategoriesContext = {
  categories: TypeCategory[];
  dispatch: React.Dispatch<TypeCategoriesAction>;
};

const logWarning = () =>
  console.warn("the component probably isn't wrapped with categories-context");

export const CategoriesContext = createContext<TypeCategoriesContext>({
  categories: [],
  dispatch: logWarning,
});

export const useCategories = () => useContext(CategoriesContext);
