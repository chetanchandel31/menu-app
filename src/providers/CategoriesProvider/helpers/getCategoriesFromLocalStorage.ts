import { CATEGORIES_LS_KEY } from "@/config";
import {
  DEFAULT_CATEGORIES,
  TypeCategory,
  schemaCategory,
} from "../categories";
import { z } from "zod";

export default function getCategoriesFromLocalStorage(): TypeCategory[] {
  try {
    return z.array(schemaCategory).parse(localStorage.get(CATEGORIES_LS_KEY));
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}
