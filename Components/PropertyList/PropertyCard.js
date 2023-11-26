import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  CardActionArea,
  CardActions,
  Chip,
  Divider,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";

function PropertyCard({ isShortListPageCard }) {
  const router = useRouter();

  return (
    <Card>
      <CardActionArea
        sx={{ display: "flex", flexDirection: { xs: "column", dmd: "row" } }}
      >
        <Box
          sx={{ padding: 2, pr: { xs: 2, dmd: 0 } }}
          onClick={() => router.push("/details")}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{
              width: { xs: "100%", dmd: 80 },
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
              <Grid item xs={8} dmd={2} onClick={() => router.push("/details")}>
                <Typography variant="caption">SKA</Typography>
                <Typography variant="subtitle2">SKA ORION</Typography>
              </Grid>
              <Grid
                item
                xs={8}
                dmd={2.5}
                onClick={() => router.push("/details")}
              >
                <Typography variant="caption">Noida Expressway</Typography>
                <Typography variant="subtitle2">Sector 143</Typography>
              </Grid>
              <Grid
                item
                xs={8}
                dmd={2.5}
                onClick={() => router.push("/details")}
              >
                <Typography variant="caption">14,500/sqft</Typography>
                <Typography variant="subtitle2">₹ 2.7 Cr - ₹ 6.5 Cr</Typography>
              </Grid>
              <Grid item xs={8} dmd={2} onClick={() => router.push("/details")}>
                <Typography variant="caption">345 Units</Typography>
                <Typography variant="subtitle2">2.5 acres</Typography>
              </Grid>
              <Grid item xs={8} dmd={2} onClick={() => router.push("/details")}>
                <Typography variant="caption">5 layouts</Typography>
                <Typography variant="subtitle2">2, 2.5, 3 BHK</Typography>
              </Grid>
              <Grid
                item
                xs={8}
                dmd={2.5}
                onClick={() => router.push("/details")}
              >
                <Typography variant="caption">Under construction</Typography>
                <Typography variant="subtitle2">2022 - 2025</Typography>
              </Grid>
              <Grid
                item
                xs={8}
                dmd={1.5}
                onClick={() => router.push("/details")}
              >
                <Typography variant="caption">Enquiries</Typography>
                <Typography variant="subtitle2">345</Typography>
              </Grid>
              <Grid item xs={8} dmd={1}>
                <Card
                  sx={{
                    width: "fit-content",
                    backgroundColor: colors?.BLACK,
                    // borderRadius: "4px !important",
                    m: 0,
                    ml: "auto !important",
                  }}
                  onClick={() => router.push("/research")}
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
      {isShortListPageCard && <Divider />}
      {isShortListPageCard && (
        <CardActions sx={{ textAlign: "end" }}>
          <Chip
            icon={<ThumbUpOffAltIcon fontSize='small' />}
            label="Liked on 23-09-2023 at 09:30 AM"
            onClick={() => { }}
            size="small"
            sx={{ fontSize: '0.75rem' }}
          />
        </CardActions>
      )}
    </Card>
  );
}

export default PropertyCard;
