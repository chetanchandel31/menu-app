import { DEFAULT_CATEGORIES, TypeCategory } from "../categories";
import doesCategoryNameExist from "./doesCategoryNameExist";

export type TypeCategoriesAction =
  | {
      type: "ADD-CATEGORY";
      payload: TypeCategory;
    }
  | {
      type: "DELETE-CATEGORY";
      payload: { categoryName: string };
    }
  | {
      type: "UPDATE-CATEGORY";
      payload: { categoryNameToUpdate: string; updatedCategory: TypeCategory };
    }
  | {
      type: "ADD_MENU_ITEM_TO_CATEGORY";
      payload: {
        categoryName: string;
        menuItemToAdd: TypeCategory["menuItems"][number];
      };
    }
  | {
      type: "RESTORE_DEFAULT_DATA";
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
      return [action.payload, ...state];
    }
  }

  // delete category
  if (action.type === "DELETE-CATEGORY") {
    return state.filter(
      (category) => category.categoryName !== action.payload.categoryName
    );
  }

  // update category
  if (action.type === "UPDATE-CATEGORY") {
    return state.map((category) =>
      category.categoryName === action.payload.categoryNameToUpdate
        ? action.payload.updatedCategory
        : category
    );
  }

  // add menu item to category
  if (action.type === "ADD_MENU_ITEM_TO_CATEGORY") {
    return state.map((category) => {
      if (category.categoryName !== action.payload.categoryName) {
        return category;
      }

      return {
        ...category,
        menuItems: [action.payload.menuItemToAdd, ...category.menuItems],
      };
    });
  }

  // restore default
  if (action.type === "RESTORE_DEFAULT_DATA") {
    return DEFAULT_CATEGORIES;
  }

  return [...state];
}
