import {
  BooleanParam,
  StringParam,
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

export default function useAppQueryParams() {
  return useQueryParams({
    "search-query": StringParam,
    "selected-categories": CommaArrayParam,
    "show-filters": BooleanParam,
  });
}
