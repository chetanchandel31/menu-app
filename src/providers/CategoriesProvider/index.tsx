import { useReducer } from "react";
import getCategoriesFromLocalStorage from "./helpers/getCategoriesFromLocalStorage";
import { CategoriesContext } from "./useCategories";
import categoriesReducer, {
  TypeCategoriesAction,
} from "./helpers/categoriesReducer";
import { TypeCategory } from "./categories";
import { CATEGORIES_LS_KEY } from "@/config";

type Props = { children: React.ReactNode };

// goal: allow child components to read and manage categories, nothing more
export default function CategoriesProvider({ children }: Props) {
  const initialCategories = getCategoriesFromLocalStorage();

  const reducer = (
    state: TypeCategory[],
    action: TypeCategoriesAction
  ): TypeCategory[] => {
    const updatedState = categoriesReducer(state, action);

    try {
      // sync updated-state to local storage before moving on
      localStorage.setItem(CATEGORIES_LS_KEY, JSON.stringify(updatedState));
    } catch (e) {
      console.log(e, "#iwu34873920");
    }

    return updatedState;
  };

  const [categories, dispatch] = useReducer(reducer, initialCategories);

  return (
    <CategoriesContext.Provider value={{ categories, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
}
