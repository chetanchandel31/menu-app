import { Grid, Typography } from "@mui/material";

type Props = { name: string; description: string; price?: number };

export default function FoodMenuItem({ description, name, price }: Props) {
  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item>
          <Typography fontSize={20} sx={{ color: "#fff" }}>
            {name}
          </Typography>
        </Grid>

        <Grid item>
          {price ? (
            <Typography fontSize={20} sx={{ color: "#fff" }}>
              ₹{price}
            </Typography>
          ) : (
            <Typography fontSize={12} sx={{ color: "#fff" }}>
              (Based on Availability)
            </Typography>
          )}
        </Grid>
      </Grid>

      <Typography
        component={"div"}
        sx={{ color: "#fff", lineHeight: 1.2, maxWidth: "90%" }}
        variant="caption"
      >
        {description}
      </Typography>
    </>
  );
}
