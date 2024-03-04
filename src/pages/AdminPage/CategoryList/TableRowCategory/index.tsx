import ThreeDotMenu from "@/components/ThreeDotMenu";
import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { Box, MenuItem, TableCell, TableRow, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import getCategoryUrl from "./getCategoryUrl";
import useConfirmCategoryDelete from "./useConfirmCategoryDelete";
import useAppQueryParams from "@/hooks/useAppQueryParams";
import useDragCategory from "./DragHandleCategory/useDragCategory";
import DragHandleCategory from "./DragHandleCategory";
import DraggingTableRowUnderline from "@/components/DraggingTableRowUnderline";

type Props = {
  category: TypeCategory;
  categoryIndex: number;
};

export default function TableRowCategory({ category, categoryIndex }: Props) {
  const [, setQueryParams] = useAppQueryParams();
  const navigate = useNavigate();
  const categoryUrl = getCategoryUrl({ categoryName: category.categoryName });

  const confirmCategoryDelete = useConfirmCategoryDelete();

  const { containerRef, handleRef, isDragging } = useDragCategory({
    categoryIndex,
  });

  return (
    <>
      <TableRow
        ref={containerRef}
        hover
        sx={{
          cursor: "pointer",
          opacity: isDragging ? 0.5 : 1,
        }}
        onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey) {
            //  ctrl or meta key clicked => don't do anything, let <a /> tag handle
            // else -> navigate programmatically
            e.preventDefault();
            navigate(categoryUrl);
          }
        }}
      >
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DragHandleCategory handleRef={handleRef} />

            <Typography
              component={Link}
              to={categoryUrl}
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
              variant="body2"
            >
              {category.categoryName}
            </Typography>
          </Box>
        </TableCell>

        <TableCell align="center">
          <Typography color="text.secondary" variant="body2">
            {category.menuItems.length}
          </Typography>
        </TableCell>

        <TableCell onClick={(e) => e.stopPropagation()}>
          <ThreeDotMenu
            IconButtonProps={{
              size: "small",
            }}
          >
            <MenuItem component={Link} to={categoryUrl}>
              <Typography variant="body2">Open</Typography>
            </MenuItem>
            <MenuItem
              onClick={() =>
                setQueryParams({ "edit-category": category.categoryName })
              }
            >
              <Typography variant="body2">Edit</Typography>
            </MenuItem>
            <MenuItem
              onClick={() =>
                confirmCategoryDelete.onDelete({
                  categoryName: category.categoryName,
                })
              }
            >
              <Typography color="error" variant="body2">
                Delete
              </Typography>
            </MenuItem>
          </ThreeDotMenu>
        </TableCell>
      </TableRow>

      <DraggingTableRowUnderline isDragging={isDragging} />
    </>
  );
}
