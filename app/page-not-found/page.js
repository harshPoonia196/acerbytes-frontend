import {
  Card,
  Container,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";

// https://www.idxhome.com/service/resources/images/listing/no-photo.jpg?1698746845920

function NoPropertyFound() {
  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 2, textAlign: "center" }}>
        <ImageNotSupportedIcon fontSize="large" />
        <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
          Page you are looking for can’t be displayed
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Either page listing is removed or you don’t have access. Please
          contact us for more information
        </Typography>
      </Card>
      <Card sx={{ mt: 2 }}>
        <CardActionArea sx={{ p: 2, display: "flex", justifyContent: "start" }}>
          <ImageSearchIcon />
          <Typography variant="subtitle2" sx={{ ml: 1, alignSelf: "center" }}>
            View more from Supertech
          </Typography>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea sx={{ p: 2, display: "flex", justifyContent: "start" }}>
          <TravelExploreIcon />
          <Typography variant="subtitle2" sx={{ ml: 1, alignSelf: "center" }}>
            Search more in Noida
          </Typography>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea sx={{ p: 2, display: "flex", justifyContent: "start" }}>
          <HomeIcon />
          <Typography variant="subtitle2" sx={{ ml: 1, alignSelf: "center" }}>
            Go to Home
          </Typography>
        </CardActionArea>
      </Card>
      <Card>
        <CardActionArea sx={{ p: 2, display: "flex", justifyContent: "start" }}>
          <HowToRegIcon />
          <Typography variant="subtitle2" sx={{ ml: 1, alignSelf: "center" }}>
            Sign in
          </Typography>
        </CardActionArea>
      </Card>
    </Container>
  );
}

export default NoPropertyFound;
