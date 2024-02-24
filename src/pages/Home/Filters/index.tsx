import useAppQueryParams from "@/hooks/useAppQueryParams";
import useDebounce from "@/hooks/useDebounce";
import { FilterListRounded, SearchRounded } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import FiltersDrawer from "./FiltersDrawer";

type Props = {};

export default function Filters({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();
  const [searchQuery, setSearchQuery] = useState(
    queryParams["search-query"] || ""
  );
  const debounce = useDebounce({ delayMs: 200 });

  const onSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debounce(() => setQueryParams({ "search-query": e.target.value || null }));
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ color: "#fff" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              name="Search-food-item"
              InputProps={{
                style: {
                  backgroundColor: "#fff",
                },
              }}
              sx={{
                borderRadius: "8px 0 0 8px",
              }}
              placeholder="Search food item"
              onChange={onSearchQueryChange}
              value={searchQuery}
            />
            <Button
              sx={{ height: 56, borderRadius: "0 8px 8px 0" }}
              variant="contained"
            >
              <SearchRounded />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} textAlign={"right"}>
          <Button
            color="inherit"
            startIcon={<FilterListRounded />}
            onClick={() => setQueryParams({ "show-filters": true })}
            variant="outlined"
          >
            Filters
          </Button>
        </Grid>
      </Grid>

      <FiltersDrawer
        isOpen={queryParams["show-filters"] === true}
        onClose={() => setQueryParams({ "show-filters": null })}
      />
    </Box>
  );
}
