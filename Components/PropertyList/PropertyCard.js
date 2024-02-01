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

function PropertyCard(props) {
  const { propertyDetails, isShortListPageCard } = props
  const router = useRouter();

  return (
    <Card>
      <CardActionArea sx={{ p: 2 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={13.5} sm={8} md={4}>
            <Box sx={{ display: 'flex' }} onClick={() => router.push("/details")}>
              <CardMedia
                component="img"
                alt="green iguana"
                sx={{
                  width: 80,
                  borderRadius: "8px", mr: 2
                }}
                image="https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg"
              />
              <Box sx={{ flex: 1 }} onClick={() => router.push("/details")}>
                <Typography variant="caption">{propertyDetails?.overview?.builder}</Typography>
                <Typography variant="subtitle2">{propertyDetails?.overview?.projectName}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2.5} sx={{ display: { xs: 'block', sm: 'none' } }}>
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
          <Grid
            item
            xs={8}
            sm={4}
            md={2}
            onClick={() => router.push("/details")}
          >
            <Typography variant="caption">{propertyDetails?.location?.area}</Typography>
            <Typography variant="subtitle2">{propertyDetails?.location?.sector}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2.5}
            onClick={() => router.push("/details")}
          >
            <Typography variant="caption">14,500/sqft</Typography>
            <Typography variant="subtitle2">₹ 2.7 Cr - ₹ 6.5 Cr</Typography>
          </Grid>
          <Grid item xs={8} sm={4} md={1.5} onClick={() => router.push("/details")}>
            <Typography variant="caption">{propertyDetails?.layout?.totalUnits}</Typography>
            <Typography variant="subtitle2">2.5 acres</Typography>
          </Grid>
          <Grid item xs={8} sm={4} md={2} onClick={() => router.push("/details")}>
            <Typography variant="caption">{propertyDetails?.layout?.layoutType.join(", ")}</Typography>
            <Typography variant="subtitle2">2, 2.5, 3 BHK</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2}
            onClick={() => router.push("/details")}
          >
            <Typography variant="caption">{propertyDetails?.overview?.status}</Typography>
            <Typography variant="subtitle2">{propertyDetails?.overview?.launchYear} - {propertyDetails?.overview?.completionYear}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={2.5}
            md={1}
            onClick={() => router.push("/details")}
          >
            <Typography variant="caption">Enquiries</Typography>
            <Typography variant="subtitle2">345</Typography>
          </Grid>
          <Grid item sm={1.5} md={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
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
