import { Box, Fade, Typography, useTheme } from "@mui/material";

export default function HelperText({
  minHeight,
  text,
}: {
  minHeight?: number;
  text: string;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(2, 0),
        minHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in>
        <Typography
          variant={"caption"}
          style={{ color: theme.palette.text.secondary }}
        >
          {text}
        </Typography>
      </Fade>
    </Box>
  );
}
