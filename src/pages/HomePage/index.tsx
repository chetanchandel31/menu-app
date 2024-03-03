import Header from "@/components/Header";
import { config } from "@/config";
import { routes } from "@/routes/routes";
import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import BrandName from "../MenuPage/BrandName";
import { Helmet } from "react-helmet";

type Props = {};

export default function HomePage({}: Props) {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Brand name</title>
      </Helmet>

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

            <Grid item textAlign="center" xs={12} md={6}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <BrandName />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <Button
                    component={Link}
                    to={routes.menu.path}
                    fullWidth
                    size="large"
                    endIcon={<ArrowForwardRounded />}
                    sx={{ maxWidth: 320 }}
                    variant="contained"
                  >
                    <Typography
                      component="span"
                      color="inherit"
                      fontWeight={700}
                      variant="h6"
                    >
                      Explore now
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
