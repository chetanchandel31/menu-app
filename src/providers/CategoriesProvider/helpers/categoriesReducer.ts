import { TypeCategory } from "../categories";

type TypeOnFinish = (type: "error" | "success", message: string) => void;

export type TypeCategoriesAction = {
  type: "ADD-CATEGORY";
  payload: TypeCategory;
  onFinish?: TypeOnFinish;
};

export default function categoriesReducer(
  state: TypeCategory[],
  action: TypeCategoriesAction
): TypeCategory[] {
  if (action.type === "ADD-CATEGORY") {
    const doesExistAlready =
      state.findIndex(
        (category) =>
          category.categoryName.toLowerCase() ===
          action.payload.categoryName.toLowerCase()
      ) !== -1;

    if (doesExistAlready) {
      action.onFinish?.("error", "Category with this name already exists");
    } else {
      action.onFinish?.(
        "success",
        `New category created: ${action.payload.categoryName}`
      );
      return [...state, action.payload];
    }
  }

  return [...state];
}
