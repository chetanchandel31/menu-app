import useAppQueryParams from "@/hooks/useAppQueryParams";
import { Autocomplete, Chip, Grid, TextField } from "@mui/material";
import getSelectedCategories from "../helpers/getSelectedCategories";
import { useCategories } from "@/providers/CategoriesProvider/useCategories";

type Props = {};

export default function SelectCategories({}: Props) {
  const [queryParams, setQueryParams] = useAppQueryParams();

  const { categories } = useCategories();

  const categoryNames = categories.map((category) => category.categoryName);
  const selectedCategories = getSelectedCategories(queryParams);

  const setSelectedCategories = (categories: string[]) => {
    if (categories.length > 0) {
      setQueryParams({ "selected-categories": categories });
    } else {
      setQueryParams({ "selected-categories": null });
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={categoryNames}
          onChange={(_e, value) => setSelectedCategories(value)}
          value={selectedCategories}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              name="tag"
              InputLabelProps={{ shrink: true }}
              size="small"
              label={"Select categories"}
            />
          )}
        />
      </Grid>

      {selectedCategories.length > 0 ? (
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {selectedCategories.map((category) => (
              <Grid item key={category}>
                <Chip
                  color="primary"
                  size="small"
                  tabIndex={-1}
                  label={category}
                  key={category}
                  onDelete={() =>
                    setSelectedCategories(
                      [...selectedCategories].filter(
                        (_category) => _category !== category
                      )
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
