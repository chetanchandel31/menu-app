import useAppQueryParams, { ENUM_SORT_BY } from "@/hooks/useAppQueryParams";
import { TextField } from "@mui/material";
import { sentenceCase } from "change-case";

type Props = {};

type TypeSortBy = (typeof ENUM_SORT_BY)[keyof typeof ENUM_SORT_BY];

export default function SortBy({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();

  const value = queryParams["sort-by"] || "";

  const options = Object.values(ENUM_SORT_BY).map((sortBy) => (
    <option key={sortBy} value={sortBy}>
      {sentenceCase(sortBy)}
    </option>
  ));

  return (
    <TextField
      select
      fullWidth={true}
      size="small"
      label="Sort by"
      SelectProps={{ native: true }}
      InputLabelProps={{ shrink: true }}
      onChange={(e) =>
        setQueryParams({
          "sort-by": (e.target.value as TypeSortBy) || null,
        })
      }
      style={{ minWidth: 150 }}
      value={value}
    >
      <option value={""}></option>
      {options}
    </TextField>
  );
}
