"use client";

import {
  Box,
  Typography,
  Container,
  Card,
  Grid,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          // backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: "#000", display: { xs: "none", sm: "block" } }}
        >
          For better decision in real estate
        </Typography>
        <Typography
          variant="h3"
          sx={{ color: "#000", display: { xs: "block", sm: "none" } }}
        >
          For better decision in real estate
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: colors.DISABLED,
            display: { xs: "block", sm: "none" },
            mt: 2,
          }}
        >
          Research . Consult . Decide
        </Typography>
        <Typography
          variant="h3"
          sx={{
            display: { xs: "none", sm: "block" },
            color: colors.DISABLED,
            mt: 2,
          }}
        >
          Research . Consult . Decide
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={6} sm={4} md={3}>
            <Card>
              <CardActionArea
                sx={{ p: 2, textAlign: "center" }}
                onClick={() => {
                  router.push("/property-list");
                }}
              >
                <Typography variant="h4">Noida</Typography>
                <Typography variant="h6">2 Properties</Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Card>
              <CardActionArea
                sx={{ p: 2, textAlign: "center" }}
                onClick={() => {
                  router.push("/property-list");
                }}
              >
                <Typography variant="h4">Gurgaon</Typography>
                <Typography variant="h6">2 Properties</Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Card>
              <CardActionArea
                sx={{ p: 2, textAlign: "center" }}
                onClick={() => {
                  router.push("/property-list");
                }}
              >
                <Typography variant="h4">Mumbai</Typography>
                <Typography variant="h6">2 Properties</Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <Card>
              <CardActionArea
                sx={{ p: 2, textAlign: "center" }}
                onClick={() => {
                  router.push("/property-list");
                }}
              >
                <Typography variant="h4">Pune</Typography>
                <Typography variant="h6">2 Properties</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
