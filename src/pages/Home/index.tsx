import Header from "@/components/Header";
import { Box, Container } from "@mui/material";
import BrandName from "./BrandName";

type Props = {};

export default function Home({}: Props) {
  return (
    <Box
      sx={{
        backgroundImage: "url('/background.png')",
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
      </Container>
    </Box>
  );
}
