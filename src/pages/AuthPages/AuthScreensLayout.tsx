import Header from "@/components/Header";
import { config } from "@/config";
import { Box, Card, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

export default function AuthScreensLayout() {
  const theme = useTheme();

  return (
    <>
      <Header />

      <Box
        sx={{
          backgroundColor: red["900"],
          minHeight: `calc(100vh - ${config.HEADER_MIN_HEIGHT}px)`,
          py: 5,
        }}
      >
        <Card
          sx={{
            width: 480,
            maxWidth: "95%",
            margin: theme.spacing(6, "auto", 6),
            px: { xs: 2, md: 5 },
            pt: 2,
            pb: 3,
          }}
        >
          <Outlet />
        </Card>
      </Box>
    </>
  );
}
