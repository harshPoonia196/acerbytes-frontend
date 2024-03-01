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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Footer from "Components/Footer";
import { listOfPages } from "Components/NavBar/Links";
import React from "react";
import { clearItem, getItem } from "utills/utills";
import { propertyRedirectKey } from "utills/Constants";

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    let isRedirect = getItem(propertyRedirectKey);
    if (isRedirect) {
      clearItem(propertyRedirectKey);
      router.push(isRedirect);
    }
  }, []);

  return (
    <>
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
            variant="h1"
            sx={{
              color: "#000",
              fontWeight: 300,
              fontSize: { sm: "2em !important", md: "3em !important" },
            }}
          >
            for better reach and data based decision in real estate
          </Typography>

          <Box
            sx={{
              display: "flex",
              mt: 2,
              width: "100%",
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: colors.DISABLED,
              }}
            >
              Research
            </Typography>
            <ArrowRightAltIcon
              fontSize="small"
              sx={{ alignSelf: "center", color: colors.DISABLED, mx: 0.5 }}
            />
            <Typography
              variant="h3"
              sx={{
                color: colors.DISABLED,
              }}
            >
              Consult
            </Typography>
            <ArrowRightAltIcon
              fontSize="small"
              sx={{ alignSelf: "center", color: colors.DISABLED, mx: 0.5 }}
            />
            <Typography
              variant="h3"
              sx={{
                color: colors.DISABLED,
              }}
            >
              Decide
            </Typography>
          </Box>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "uppercase", color: colors.BLUE }}
              >
                data research for selective properties in
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Card>
                <CardActionArea
                  sx={{ p: 2, textAlign: "center" }}
                  onClick={() => {
                    router.push(listOfPages.commonPropertyList);
                  }}
                >
                  <Typography variant="h3">Noida</Typography>
                  <Typography variant="h6">2 Properties</Typography>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Card>
                <CardActionArea
                  sx={{ p: 2, textAlign: "center" }}
                  onClick={() => {
                    router.push(listOfPages.commonPropertyList);
                  }}
                >
                  <Typography variant="h3">Gurgaon</Typography>
                  <Typography variant="h6">2 Properties</Typography>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Card>
                <CardActionArea
                  sx={{ p: 2, textAlign: "center" }}
                  onClick={() => {
                    router.push(listOfPages.commonPropertyList);
                  }}
                >
                  <Typography variant="h3">Mumbai</Typography>
                  <Typography variant="h6">2 Properties</Typography>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Card>
                <CardActionArea
                  sx={{ p: 2, textAlign: "center" }}
                  onClick={() => {
                    router.push(listOfPages.commonPropertyList);
                  }}
                >
                  <Typography variant="h3">Pune</Typography>
                  <Typography variant="h6">2 Properties</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
