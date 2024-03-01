import { CATEGORY } from "@/hooks/useAppQueryParams";

type Params = { categoryName: string };

export default function getCategoryUrl({ categoryName }: Params) {
  return encodeURI(`${location.pathname}?${CATEGORY}=${categoryName}`);
}
