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
import React, { useState } from "react";
import { clearItem, getItem } from "utills/utills";
import { propertyRedirectKey } from "utills/Constants";
import { propertyByCity } from "api/Property.api";
import Loader from "Components/CommonLayouts/Loading";

export default function Home() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [cityRoute, setCityRoute] = useState([]);

  const getAllPropertyByCity = async () => {
    try {
      setLoading(true);
      let res = await propertyByCity();
      if (res.status === 200) {
        setCityRoute(res?.data?.data);
      } else {
        console.log("err");
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list", "error"
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isRedirect = getItem(propertyRedirectKey);
    if (isRedirect) {
      clearItem(propertyRedirectKey);
      router.push(isRedirect);
    }
    getAllPropertyByCity()
  }, []);

  return (
    <>
     {isLoading && <Loader />}
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
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} sx={{ textAlign: "center", justifyContent: "center" }}>
              <Typography
                variant="h5"
                sx={{ textTransform: "uppercase", color: colors.BLUE }}
              >
                data research for selective properties in
              </Typography>
            </Grid>
            {cityRoute?.map((city) => (
              <Grid item xs={6} sm={4} md={3} key={city?.city}>
                <Card>
                  <CardActionArea
                    sx={{ p: 2, textAlign: "center" }}
                    onClick={() => { 
                      router.push(listOfPages.commonPropertyList + `/${city?.city}`);
                    }}
                  >
                    <Typography variant="h3">{city?.city}</Typography>
                    <Typography variant="h6">{city?.propertyCount} Properties</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))} 
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
