import useAppQueryParams from "@/hooks/useAppQueryParams";
import { FilterListRounded } from "@mui/icons-material";
import { Badge, Box, Button, Grid } from "@mui/material";
import FiltersDrawer from "./FiltersDrawer";
import SearchBar from "./SearchBar";

type Props = {};

export default function Filters({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();

  let filtersCount = 0;
  if (queryParams["sort-by"]) {
    filtersCount += 1;
  }
  if (
    queryParams["selected-categories"] &&
    queryParams["selected-categories"]?.length > 0
  ) {
    filtersCount += queryParams["selected-categories"]?.length;
  }

  const clearAllFilters = () => {
    setQueryParams({
      "show-filters": null,
      "selected-categories": null,
      "sort-by": null,
    });
  };

  return (
    <Box sx={{ color: "#fff" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent={"end"}>
            {filtersCount > 0 ? (
              <Grid item>
                <Button onClick={clearAllFilters}>
                  <strong>Clear all filters</strong>
                </Button>
              </Grid>
            ) : null}

            <Grid item>
              <Badge badgeContent={filtersCount} color="primary">
                <Button
                  color="inherit"
                  startIcon={<FilterListRounded />}
                  onClick={() => setQueryParams({ "show-filters": true })}
                  variant="outlined"
                >
                  Filters
                </Button>
              </Badge>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <FiltersDrawer
        isOpen={queryParams["show-filters"] === true}
        onClose={() => setQueryParams({ "show-filters": null })}
      />
    </Box>
  );
}
