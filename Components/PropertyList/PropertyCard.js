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
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <Box sx={{ padding: 2, pr: { xs: 2, md: 0 } }}>
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{
              width: { xs: "100%", md: 80 },
              borderRadius: "8px",
            }}
            image="https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg"
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", flex: "1 0 auto" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={8} md={2}>
                <Typography variant="caption">SKA</Typography>
                <Typography variant="subtitle2">SKA ORION</Typography>
              </Grid>
              <Grid item xs={8} md={2.5}>
                <Typography variant="caption">Noida Expressway</Typography>
                <Typography variant="subtitle2">Sector 143</Typography>
              </Grid>
              <Grid item xs={8} md={2.5}>
                <Typography variant="caption">14,500/sqft</Typography>
                <Typography variant="subtitle2">₹ 2.7 Cr - ₹ 6.5 Cr</Typography>
              </Grid>
              <Grid item xs={8} md={2}>
                <Typography variant="caption">345 Units</Typography>
                <Typography variant="subtitle2">2.5 acres</Typography>
              </Grid>
              <Grid item xs={8} md={2}>
                <Typography variant="caption">5 layouts</Typography>
                <Typography variant="subtitle2">2, 2.5, 3 BHK</Typography>
              </Grid>
              <Grid item xs={8} md={2.5}>
                <Typography variant="caption">Under construction</Typography>
                <Typography variant="subtitle2">2022 - 2025</Typography>
              </Grid>
              <Grid item xs={8} md={1.5}>
                <Typography variant="caption">Enquiries</Typography>
                <Typography variant="subtitle2">345</Typography>
              </Grid>
              <Grid item xs={8} md={1}>
                <Card
                  sx={{
                    width: "fit-content",
                    backgroundColor: colors?.BLUE,
                    borderRadius: "4px !important",
                    m: 0,
                    ml: "auto !important",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      width: "fit-content",
                      color: "white",
                      p: 0.5,
                      px: 1,
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
