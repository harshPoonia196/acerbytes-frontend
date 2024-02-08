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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';

function PropertyCard(props) {
  const { propertyDetails, isShortListPageCard, createdDate } = props
  const router = useRouter();

  const formattedCreatedAt = createdDate && format(new Date(createdDate), 'dd-MM-yyyy \'at\' HH:mm aaa')

  return (
    <Card>
      <CardActionArea sx={{ p: 2 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={13.5} sm={8} md={4}>
            <Box sx={{ display: 'flex' }} onClick={() => router.push(`/details/${propertyDetails._id}`)}>
              <CardMedia
                component="img"
                alt="green iguana"
                sx={{
                  width: 80,
                  borderRadius: "8px", mr: 2
                }}
                image="https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg"
              />
              <Box sx={{ flex: 1 }} onClick={() => router.push(`/details/${propertyDetails._id}`)}>
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
            onClick={() => router.push(`/details/${propertyDetails._id}`)}
          >
            <Typography variant="caption">{propertyDetails?.location?.area}</Typography>
            <Typography variant="subtitle2">{propertyDetails?.location?.sector}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2.5}
            onClick={() => router.push(`/details/${propertyDetails._id}`)}
          >
            <Typography variant="caption">{propertyDetails?.unitsPlan?.map(item => `${item.areaValue} ${item.areaUnit}` ).join(", ")}</Typography>
            {/* <Typography variant="subtitle2">₹ 2.7 Cr - ₹ 6.5 Cr</Typography> */}
          </Grid>
          <Grid item xs={8} sm={4} md={1.5} onClick={() => router.push(`/details/${propertyDetails._id}`)}>
            <Typography variant="caption">{propertyDetails?.layout?.totalUnits}</Typography>
            <Typography variant="subtitle2">{propertyDetails?.layout?.area}</Typography>
          </Grid>
          <Grid item xs={8} sm={4} md={2} onClick={() => router.push(`/details/${propertyDetails._id}`)}>
            <Typography variant="caption">{propertyDetails?.layout?.layoutType.join(", ")}</Typography>
            <Typography variant="subtitle2">{propertyDetails?.unitsPlan?.map(item => item.propertyLayout).join(", ")}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2}
            onClick={() => router.push(`/details/${propertyDetails._id}`)}
          >
            <Typography variant="caption">{propertyDetails?.overview?.status}</Typography>
            <Typography variant="subtitle2">{propertyDetails?.overview?.launchYear} - {propertyDetails?.overview?.completionYear}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={2.5}
            md={1}
            onClick={() => router.push(`/details/${propertyDetails._id}`)}
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
            icon={<ThumbUpIcon style={{ color: '#276ef1', mr: 1 }} />}
            // label="Liked on 23-09-2023 at 09:30 AM"
            label={`Liked on ${formattedCreatedAt}`}
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
