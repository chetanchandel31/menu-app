import { useCategories } from "@/providers/CategoriesProvider/useCategories";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CategoryCreate from "../CategoryCreate";
import TableRowCategory from "./TableRowCategory";
import HelperText from "@/components/HelperText";

type Props = {};

export default function CategoryList({}: Props) {
  const { categories, dispatch } = useCategories();

  const rows: React.ReactNode[] = [];

  categories.forEach((category) => {
    rows.push(
      <TableRowCategory category={category} key={category.categoryName} />
    );
  });

  if (rows.length === 0) {
    rows.push(
      <TableRow key="empty-state">
        <TableCell colSpan={4}>
          <HelperText text="No categories added yet" minHeight={100} />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography fontWeight={700} variant="h5">
          Categories
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <CategoryCreate />
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={"100%"}>
                  <Typography
                    color="text.secondary"
                    fontWeight={700}
                    variant="caption"
                  >
                    Category name
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color="text.secondary"
                    fontWeight={700}
                    variant="caption"
                  >
                    Items
                  </Typography>
                </TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Button
          onClick={() => {
            dispatch({
              type: "RESTORE_DEFAULT_DATA",
            });
          }}
        >
          Restore default data
        </Button>
      </Grid>
    </Grid>
  );
}
