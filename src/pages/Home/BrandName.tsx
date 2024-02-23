import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

type Props = {};

export default function BrandName({}: Props) {
  return (
    <Box sx={{ py: 5 }}>
      <Typography
        fontWeight={700}
        fontSize={50}
        sx={{ color: red["700"], lineHeight: 1, mb: 1 }}
        textAlign={"center"}
      >
        BRAND NAME
      </Typography>

      <Typography
        fontWeight={700}
        fontSize={80}
        sx={{ color: "#fff", lineHeight: 1 }}
        textAlign={"center"}
      >
        MENU
      </Typography>

      <Typography textAlign={"center"} sx={{ color: "#fff" }} variant="h6">
        - Since 2018 -
      </Typography>
    </Box>
  );
}
