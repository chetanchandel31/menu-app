import Header from "@/components/Header";
import { Box, Container, Grid } from "@mui/material";
import BrandName from "./BrandName";
import CategoryName from "@/components/CategoryName";
import FoodMenuItem from "@/components/FoodMenuItem";

type Props = {};

export default function Home({}: Props) {
  return (
    <Box
      sx={{
        backgroundImage: "url('/background.png')",
        boxShadow: "inset 0 0 0 100vmax rgba(0,0,0,.3)",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        overflow: "auto",
      }}
    >
      <Header />

      <Container maxWidth="md">
        <BrandName />

        <CategoryName>Appetizers</CategoryName>

        <Grid container>
          <Grid item xs={12} md={6}>
            <FoodMenuItem
              name="Peanut Masala"
              description="A zesty and spicy snack made with chick peas, tomatoes and onions with an Indian twist"
              // price={80}
            />
          </Grid>

          <Grid item xs={6}>
            1
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
