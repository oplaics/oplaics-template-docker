/**
 * React
 */
import { Link } from "react-router-dom";

/**
 * MUI
 */
import { Button, Grid, Skeleton, Typography, useTheme } from "@mui/material";

/**
 * Components
 */
import { bouncy } from "ldrs";

bouncy.register();

export default function Fallback({ text, loading, homeButton = false }) {
  const theme = useTheme();

  return (
    <Grid
      container
      component="main"
      spacing={2}
      direction="column"
      sx={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton variant="rectangular" width={90} height={90} />

      <Grid container sx={{ justifyContent: "center" }}>
        {loading && (
          <l-bouncy
            size="45"
            speed="1.75"
            color={theme.palette.primary.main}
          ></l-bouncy>
        )}
      </Grid>

      <Grid>
        <Typography variant="h6" style={{ opacity: 1 }}>
          Leo Emails
        </Typography>
      </Grid>

      <Grid>
        <Typography size={16} sx={{ opacity: 0.5, px: 5, textAlign: "center" }}>
          {text}
        </Typography>
      </Grid>

      {homeButton && (
        <Grid sx={{ textAlign: "center" }}>
          <Button
            variant="text"
            color="primary"
            component={Link}
            to="/"
          >
            Reintentar
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
