import { CATEGORIES_LS_KEY } from "@/config";
import {
  DEFAULT_CATEGORIES,
  TypeCategory,
  schemaCategory,
} from "../categories";
import { z } from "zod";

export default function getCategoriesFromLocalStorage(): TypeCategory[] {
  try {
    const localStorageCategories = JSON.parse(
      localStorage.getItem(CATEGORIES_LS_KEY) || ""
    );

    return z.array(schemaCategory).parse(localStorageCategories);
  } catch (e) {
    console.log(e, "#eiu2938723839");
    return DEFAULT_CATEGORIES;
  }
}
