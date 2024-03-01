import {
  BooleanParam,
  StringParam,
  createEnumParam,
  decodeDelimitedArray,
  encodeDelimitedArray,
  useQueryParams,
} from "use-query-params";

/** Uses a comma to delimit entries. e.g. ['a', 'b'] => qp?=a,b */
const CommaArrayParam = {
  encode: (array: string[] | null | undefined) =>
    encodeDelimitedArray(array, ","),

  decode: (arrayStr: string | (string | null)[] | null | undefined) =>
    decodeDelimitedArray(arrayStr, ","),
};

export const SORT_BY = "SORT_BY";
export const ENUM_SORT_BY = {
  PRICE_HIGH_TO_LOW: "price-high-to-low",
  PRICE_LOW_TO_HIGH: "price-low-to-high",
} as const;
export const SortByParams = createEnumParam([
  ENUM_SORT_BY.PRICE_HIGH_TO_LOW,
  ENUM_SORT_BY.PRICE_LOW_TO_HIGH,
]);

export const CATEGORY = "category";

export default function useAppQueryParams() {
  return useQueryParams({
    // menu filters
    "show-filters": BooleanParam,

    "search-query": StringParam,
    "selected-categories": CommaArrayParam,
    "sort-by": SortByParams,

    // admin
    [CATEGORY]: StringParam,
  });
}
