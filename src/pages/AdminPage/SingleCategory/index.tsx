import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { routes } from "@/routes/routes";
import {
  AddRounded,
  ArrowBackRounded,
  DeleteRounded,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import CategoryOverview from "./CategoryOverview";
import HelperText from "@/components/HelperText";
import TableRowMenuItem from "./TableRowMenuItem";
import useConfirmCategoryDelete from "../CategoryList/TableRowCategory/useConfirmCategoryDelete";

type Props = { category: TypeCategory };

export default function SingleCategory({ category }: Props) {
  const confirmCategoryDelete = useConfirmCategoryDelete();

  const menuItemRows: React.ReactNode[] = [];

  category.menuItems.forEach((menuItem) => {
    menuItemRows.push(
      <TableRowMenuItem menuItem={menuItem} key={menuItem.menuItemName} />
    );
  });

  if (menuItemRows.length === 0) {
    menuItemRows.push(
      <TableRow key="empty-state">
        <TableCell colSpan={5}>
          <HelperText text="No menu items added yet" minHeight={100} />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          component={Link}
          to={routes.admin.path}
          size="small"
          startIcon={<ArrowBackRounded />}
        >
          Categories
        </Button>
      </Grid>

      <Grid item xs={12}>
        <CategoryOverview category={category} />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Button startIcon={<AddRounded />} size="small" variant="contained">
          Add menu item
        </Button>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableBody>{menuItemRows}</TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Button
          onClick={() => {
            confirmCategoryDelete.onDelete({
              categoryName: category.categoryName,
            });
          }}
          size="small"
          startIcon={<DeleteRounded />}
          sx={{ my: 5 }}
          variant="outlined"
        >
          Delete category
        </Button>
      </Grid>
    </Grid>
  );
}