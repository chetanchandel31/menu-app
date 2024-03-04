import { Box, TableCell, TableRow, useTheme } from "@mui/material";

type Props = { isDragging: boolean };

export default function DraggingTableRowUnderline({ isDragging }: Props) {
  const theme = useTheme();

  return (
    <>
      {isDragging ? (
        <TableRow sx={{ "& td": { border: 0 } }}>
          <TableCell colSpan={7}>
            <Box
              sx={{ borderBottom: `solid 2px ${theme.palette.primary.main}` }}
            />
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
}
