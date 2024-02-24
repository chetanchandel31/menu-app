import { Typography } from "@mui/material";

type Props = { children: React.ReactNode };

export default function CategoryName({ children }: Props) {
  return (
    <Typography
      sx={{
        color: "#fff",
        fontFamily: "trend-sans-w00-four,sans-serif",
        fontSize: 40,
      }}
      variant="h6"
    >
      {children}
    </Typography>
  );
}
