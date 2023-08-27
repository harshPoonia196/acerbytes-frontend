import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
} from "@mui/material";
import DetailsTable from "Components/DetailsPage/DetailsTable";

const propertyDetailsPage = () => {
  // Sample property data (replace this with your actual data)
  const propertyData = {
    id: "propertyId",
    title: "Stunning Oceanfront Villa",
    description: "A luxurious villa with breathtaking ocean views.",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipOrBtq6D18VUJ22pk4bUWz6zkzuLCiKxAQ_feMF=s1360-w1360-h1020",
    price: "2.5 Cr",
    area: "2500 sqft",
    bedrooms: 4,
    bathrooms: 3,
    location: "Beachside Avenue, Coastal City",
  };

  const GridItem = (props) => {
    const { children, ...rest } = props;
    return (
      <Grid item {...rest} sx={{ padding: 2, textAlign: "center" }}>
        {children}
      </Grid>
    );
  };

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={propertyData.imageUrl}
          alt={propertyData.title}
        />
        <CardContent sx={{ p: "0 !important" }}>
          <Grid container>
            <Grid item xs={12} sx={{ p: 2 }}>
              <Typography variant="h2">{propertyData.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{ p: 2 }}>
              <Typography variant="body1">
                {propertyData.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Fresh sale</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">₹ 10 Cr - ₹ 20 Cr</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Resale</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">₹ 10 L - ₹ 20 L</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Rent</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">₹ 10 K - ₹ 20 K</Typography>
            </GridItem>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <DetailsTable />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Lumex</Typography>
              <Typography variant="h2">1545</Typography>
              <Typography variant="h5">Sqft</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Caspia</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">sqft</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Gardenia</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">sqft</Typography>
            </GridItem>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default propertyDetailsPage;
