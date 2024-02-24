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
          <Typography sx={{ color: "#fff", fontSize: 20 }}>{name}</Typography>
        </Grid>

        <Grid item>
          {price ? (
            <Typography sx={{ color: "#fff", fontSize: 20 }}>
              ₹{price}
            </Typography>
          ) : (
            <Typography sx={{ color: "#fff", fontSize: 12 }}>
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
