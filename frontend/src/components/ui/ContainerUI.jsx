/**
 * MUI
 */
import { Box, Container } from "@mui/material";

export default function ContainerUI({ full, children }) {
  return (
    <Box component="main">
      {full ? (
        children
      ) : (
        <Container
          disableGutters={true}
          sx={{ mt: { xs: 18 }, mb: { xs: 10, sm: 3 }, px: 2 }}
        >
          {children}
        </Container>
      )}
    </Box>
  );
}