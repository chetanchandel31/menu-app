import Header from "@/components/Header";
import BrandName from "../MenuPage/BrandName";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { config } from "@/config";

type Props = {};

export default function HomePage({}: Props) {
  const theme = useTheme();

  return (
    <>
      <Header />

      <Box
        sx={{
          backgroundColor: blueGrey["900"],
          minHeight: `calc(100vh - ${config.HEADER_MIN_HEIGHT}px)`,
          py: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "stretch",
        }}
      >
        <Box
          sx={{
            maxWidth: theme.breakpoints.values.lg,
            px: 4,
            width: "100%",
            margin: "auto",
          }}
        >
          <Grid
            container
            spacing={5}
            direction={{ xs: "column-reverse", md: "row" }}
            alignItems={"center"}
          >
            <Grid item xs={12} md={6}>
              <img
                alt="hero"
                src="/hero.jpg"
                style={{ maxWidth: "100%", borderRadius: theme.spacing(2) }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <BrandName />

              <Box sx={{ pt: 1, textAlign: "center" }}>
                <Typography
                  fontWeight={700}
                  sx={{ color: grey[400] }}
                  variant="h5"
                >
                  Delicious recipes
                </Typography>
                <Typography sx={{ color: grey[400] }}>
                  Freshly prepared for your special delight
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
