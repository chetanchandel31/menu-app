import { TypeCategory } from "@/providers/CategoriesProvider/categories";
import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import MenuItemButtons from "./MenuItemButtons";
import useIsMdDown from "@/hooks/useIsMdDown";

type Props = {
  menuItem: TypeCategory["menuItems"][number];
};

export default function TableRowMenuItem({ menuItem }: Props) {
  const theme = useTheme();
  const isMdDown = useIsMdDown();

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: isMdDown ? "unset !important" : undefined },
        }}
      >
        <TableCell>
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
        <TableRow>
          <TableCell colSpan={5}>
            <MenuItemButtons menuItem={menuItem} />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}
