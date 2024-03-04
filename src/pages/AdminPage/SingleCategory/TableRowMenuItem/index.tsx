import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import MenuItemButtons from "./MenuItemButtons";
import useIsMdDown from "@/hooks/useIsMdDown";
import useDragMenuItem from "./DragHandleMenuItem/useDragMenuItem";
import DragHandleMenuItem from "./DragHandleMenuItem";
import DraggingTableRowUnderline from "@/components/DraggingTableRowUnderline";

type Props = {
  menuItem: TypeCategory["menuItems"][number];
  menuItemIndex: number;
  totalMenuItemsInCategory: number;
};

export default function TableRowMenuItem({
  menuItem,
  menuItemIndex,
  totalMenuItemsInCategory,
}: Props) {
  const theme = useTheme();
  const isMdDown = useIsMdDown();

  const { containerRef, handleRef, isDragging } = useDragMenuItem({
    menuItemIndex,
  });

  return (
    <>
      <TableRow
        ref={containerRef}
        sx={{
          "& > *": { borderBottom: isMdDown ? "unset !important" : undefined },
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <TableCell>
          <DragHandleMenuItem
            handleRef={handleRef}
            totalMenuItemsInCategory={totalMenuItemsInCategory}
          />
        </TableCell>
        <TableCell width={"70%"}>
          <Typography fontWeight={700} variant="body2">
            {menuItem.menuItemName}
          </Typography>

          <Typography color={"text.secondary"} variant="body2">
            {menuItem.description}
          </Typography>
        </TableCell>

        <TableCell align="center">
          {menuItem.price ? (
            <Typography variant="body2">₹{menuItem.price}</Typography>
          ) : (
            <Typography
              component="div"
              sx={{ color: theme.palette.warning.main, fontWeight: 700 }}
              variant="caption"
            >
              Based on <br /> availability.
            </Typography>
          )}
        </TableCell>

        {isMdDown ? null : (
          <TableCell>
            <MenuItemButtons menuItem={menuItem} />
          </TableCell>
        )}
      </TableRow>

      {isMdDown ? (
        <TableRow sx={{ opacity: isDragging ? 0.5 : 1 }}>
          <TableCell colSpan={5}>
            <MenuItemButtons menuItem={menuItem} />
          </TableCell>
        </TableRow>
      ) : null}

      <DraggingTableRowUnderline isDragging={isDragging} />
    </>
  );
}
