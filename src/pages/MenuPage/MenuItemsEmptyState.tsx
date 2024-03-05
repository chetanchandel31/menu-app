import useAppQueryParams from "@/hooks/useAppQueryParams";
import { SearchOffRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";

type Props = {};

export default function MenuItemsEmptyState({}: Props) {
  const [queryParams] = useAppQueryParams();
  const searchQuery = queryParams["search-query"] || "";

  return searchQuery ? (
    <Typography
      component={"div"}
      sx={{
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 5,
        maxWidth: 600,
        margin: "auto",
      }}
      variant="body2"
    >
      <SearchOffRounded />{" "}
      <div>
        Our search gremlins couldn't find anything for{" "}
        <strong>{searchQuery}</strong>. How about trying something else?
      </div>
    </Typography>
  ) : (
    <Typography
      component={"div"}
      sx={{
        color: "#fff",
        textAlign: "center",
        py: 5,
        maxWidth: 600,
        margin: "auto",
      }}
      variant="body2"
    >
      No items available at the moment
    </Typography>
  );
}
