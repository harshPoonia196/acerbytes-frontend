import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Grid,
} from "@mui/material";

function PropertyCard() {
  return (
    <Card sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ width: { xs: "100%", sm: 180 } }}
        image="https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">Godrej Woods</Typography>
              <Typography variant="body2">Godrej Reality</Typography>
              <Typography variant="caption">
                Block A, Sector 43, Noida, Uttar Pradesh 201303
              </Typography>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <Card sx={{ p: 1, background: "black" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "white" }}
                >
                  99
                </Typography>
              </Card>
            </Box>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={6} md={3}>
              <Typography variant="caption">Price</Typography>
              <Typography variant="body2">₹ 2.5 Cr – ₹ 5.6 Cr</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="caption">Type</Typography>
              <Typography variant="body2">3BHK, 4BHK</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="caption">Possession</Typography>
              <Typography variant="body2">May 2025</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="caption">Construction status</Typography>
              <Typography gutterBottom variant="body2">
                In progress
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      <Box></Box>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default PropertyCard;
