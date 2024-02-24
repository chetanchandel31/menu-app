import useAppQueryParams from "@/hooks/useAppQueryParams";
import useDebounce from "@/hooks/useDebounce";
import { ClearRounded, SearchRounded } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { useState } from "react";

type Props = {};

export default function SearchBar({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const [searchQuery, setSearchQuery] = useState(
    queryParams["search-query"] || ""
  );
  const debounce = useDebounce({ delayMs: 200 });

  const onSearchQueryChange = (value: string) => {
    debounce(() => setQueryParams({ "search-query": value || null }));
    setSearchQuery(value);
  };

  return (
    <TextField
      fullWidth
      name="Search-food-item"
      InputProps={{
        style: {
          backgroundColor: "#fff",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
        endAdornment: searchQuery ? (
          <Tooltip title="Clear search">
            <InputAdornment position="end">
              <IconButton onClick={() => onSearchQueryChange("")}>
                <ClearRounded />
              </IconButton>
            </InputAdornment>
          </Tooltip>
        ) : null,
      }}
      sx={{
        borderRadius: "8px 0 0 8px",
      }}
      placeholder="Search food item"
      onChange={(e) => onSearchQueryChange(e.target.value)}
      value={searchQuery}
    />
  );
}
