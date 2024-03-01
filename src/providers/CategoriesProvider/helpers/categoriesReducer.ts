import { TypeCategory } from "../categories";
import doesCategoryNameExist from "./doesCategoryNameExist";

export type TypeCategoriesAction =
  | {
      type: "ADD-CATEGORY";
      payload: TypeCategory;
    }
  | {
      type: "DELETE-CATEGORY";
      payload: { categoryName: string };
    };

export default function categoriesReducer(
  state: TypeCategory[],
  action: TypeCategoriesAction
): TypeCategory[] {
  // add category
  if (action.type === "ADD-CATEGORY") {
    const doesExistAlready = doesCategoryNameExist(
      action.payload.categoryName,
      state
    );

    if (!doesExistAlready) {
      return [...state, action.payload];
    }
  }

  // delete category
  if (action.type === "DELETE-CATEGORY") {
    return state.filter(
      (category) => category.categoryName !== action.payload.categoryName
    );
  }

  return [...state];
}
