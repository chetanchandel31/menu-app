import { Box, Grid, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

type Props = {};

const footerLinks = [
  {
    name: "Guest policy",
  },
  {
    name: "T & C",
  },
  {
    name: "About us",
  },
  {
    name: "Careers",
  },
  {
    name: "FAQs",
  },
  {
    name: "Cookie policy",
  },
] as const;

export default function Footer({}: Props) {
  return (
    <Box component={"footer"} sx={{ backgroundColor: indigo[900], py: 2 }}>
      <Box
        sx={{
          margin: "auto",
          width: "100%",
          maxWidth: 1000,
          px: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography
              fontWeight={700}
              fontSize={20}
              sx={{ color: "#fff", pb: 2 }}
            >
              USEFUL LINKS
            </Typography>
          </Grid>

          <Grid item xs={12} md={true}>
            <Grid container spacing={0.5}>
              {footerLinks.map((link) => (
                <Grid item xs={6} md={4} key={link.name}>
                  <Typography sx={{ color: "#fff" }} variant="body2">
                    {link.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
