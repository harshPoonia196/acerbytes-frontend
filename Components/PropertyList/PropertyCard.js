import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  CardActionArea,
} from "@mui/material";
import colors from "styles/theme/colors";

function PropertyCard() {
  return (
    <Card>
      <CardActionArea
        sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
      >
        <Box sx={{ padding: 2, pr: 0 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ width: { xs: "100%", sm: 120 }, borderRadius: "8px" }}
            image="https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg"
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            {/* <Box sx={{ display: "flex" }}>
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
          </Box> */}
            <Grid container spacing={1} columns={16}>
              <Grid item xs={6} md={2}>
                <Typography variant="caption">SKA</Typography>
                <Typography variant="subtitle2">SKA ORION</Typography>
              </Grid>
              <Grid item xs={6} md={2.5}>
                <Typography variant="caption">Noida Expressway</Typography>
                <Typography variant="subtitle2">Sector 143</Typography>
              </Grid>
              <Grid item xs={6} md={2.5}>
                <Typography variant="caption">14,500/sqft</Typography>
                <Typography variant="subtitle2">₹ 2.7 Cr - ₹ 6.5 Cr</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="caption">345 Units</Typography>
                <Typography variant="subtitle2">2.5 acres</Typography>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="caption">5 layouts</Typography>
                <Typography variant="subtitle2">2, 2.5, 3 BHK</Typography>
              </Grid>
              <Grid item xs={6} md={2.5}>
                <Typography variant="caption">Under construction</Typography>
                <Typography variant="subtitle2">2022 - 2025</Typography>
              </Grid>
              <Grid item xs={6} md={1.5}>
                <Typography variant="caption">Enquiries</Typography>
                <Typography variant="subtitle2">345</Typography>
              </Grid>
              <Grid item xs={6} md={1}>
                <Card
                  sx={{ width: "fit-content", backgroundColor: colors?.BLUE }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      width: "fit-content",
                      color: "white",
                      p: 1,
                    }}
                  >
                    99
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default PropertyCard;
