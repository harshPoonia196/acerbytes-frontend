import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";

function PropertyCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg"
      />
      <CardContent>
        <Typography variant="h5">Godrej Woods</Typography>
        <Typography variant="body2">Godrej Reality</Typography>
        <Typography variant="caption" sx={{ mb: 2 }}>
          Block A, Sector 43, Noida, Uttar Pradesh 201303
        </Typography>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Typography variant="caption" sx={{ flex: 1 }}>
            Price
          </Typography>
          <Typography variant="body2">₹ 2.5 Cr – ₹ 5.6 Cr</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="caption" sx={{ flex: 1 }}>
            Type
          </Typography>
          <Typography variant="body2">3BHK, 4BHK</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="caption" sx={{ flex: 1 }}>
            Possession
          </Typography>
          <Typography variant="body2">May 2025</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="caption" sx={{ flex: 1 }}>
            Construction status
          </Typography>
          <Typography gutterBottom variant="body2">
            In progress
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions> */}
    </Card>
  );
}

export default PropertyCard;
