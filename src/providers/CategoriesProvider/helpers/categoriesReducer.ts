import { getDeepCopy } from "@/utils/getDeepCopy";
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
  | { type: "MOVE-CATEGORIES"; payload: { fromIndex: number; toIndex: number } }
  | {
      type: "ADD_MENU_ITEM_TO_CATEGORY";
      payload: {
        categoryName: string;
        menuItemToAdd: TypeCategory["menuItems"][number];
      };
    }
  | {
      type: "UPDATE_MENU_ITEM";
      payload: {
        categoryName: string;
        menuItemName: string;
        updatedMenuItem: TypeCategory["menuItems"][number];
      };
    }
  | {
      type: "DELETE_MENU_ITEM";
      payload: {
        categoryName: string;
        menuItemName: string;
      };
    }
  | {
      type: "RESTORE_DEFAULT_DATA";
    }
  | {
      type: "MOVE-MENU-ITEMS";
      payload: { categoryName: string; fromIndex: number; toIndex: number };
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

  // sort categories
  if (action.type === "MOVE-CATEGORIES") {
    const updatedCategories = getDeepCopy(state);

    const toValue = updatedCategories[action.payload.toIndex];
    const fromValue = updatedCategories[action.payload.fromIndex];

    if (toValue && fromValue) {
      updatedCategories[action.payload.toIndex] = fromValue;
      updatedCategories[action.payload.fromIndex] = toValue;
    }

    return updatedCategories;
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

  // update menu item
  if (action.type === "UPDATE_MENU_ITEM") {
    const updatedState = getDeepCopy(state);

    updatedState.forEach((category, categoryIndex) => {
      if (category.categoryName === action.payload.categoryName) {
        updatedState[categoryIndex] = {
          ...category,
          menuItems: category.menuItems.map((menuItem) =>
            menuItem.menuItemName !== action.payload.menuItemName
              ? menuItem
              : action.payload.updatedMenuItem
          ),
        };
      }
    });

    return updatedState;
  }

  // delete menu item
  if (action.type === "DELETE_MENU_ITEM") {
    const updatedState = getDeepCopy(state);

    updatedState.forEach((category, categoryIndex) => {
      if (category.categoryName === action.payload.categoryName) {
        updatedState[categoryIndex] = {
          ...category,
          menuItems: category.menuItems.filter(
            (menuItem) => menuItem.menuItemName !== action.payload.menuItemName
          ),
        };
      }
    });

    return updatedState;
  }

  // sort menu items
  if (action.type === "MOVE-MENU-ITEMS") {
    const updatedCategories = getDeepCopy(state);

    // go over all categories
    for (
      let categoryIndex = 0;
      categoryIndex < updatedCategories.length;
      categoryIndex++
    ) {
      const category = updatedCategories[categoryIndex];

      // once found the category, swap menu items and break from loop
      if (category && category?.categoryName === action.payload.categoryName) {
        const menuItems = category?.menuItems || [];

        const toValue = menuItems[action.payload.toIndex];
        const fromValue = menuItems[action.payload.fromIndex];

        if (toValue && fromValue) {
          menuItems[action.payload.toIndex] = fromValue;
          menuItems[action.payload.fromIndex] = toValue;
        }

        updatedCategories[categoryIndex] = { ...category, menuItems };

        break;
      }
    }

    return updatedCategories;
  }

  // restore default
  if (action.type === "RESTORE_DEFAULT_DATA") {
    return DEFAULT_CATEGORIES;
  }

  return [...state];
}
