import { Typography } from "@mui/material";

type Props = { children: React.ReactNode };

export default function CategoryName({ children }: Props) {
  return (
    <Typography
      fontWeight={700}
      fontSize={40}
      sx={{
        color: "#fff",
        fontFamily: "trend-sans-w00-four,sans-serif",
      }}
      variant="h6"
    >
      {children}
    </Typography>
  );
}
