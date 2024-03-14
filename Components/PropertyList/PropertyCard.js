import {
  Card,
  CardMedia,
  Typography,
  Box,
  Grid,
  CardActionArea,
  CardActions,
  Chip,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

function PropertyCard(props) {
  const { propertyDetails, isShortListPageCard, createdDate } = props;
  const router = useRouter();
  const constructPropertyUrl = (propertyDetailsData) => {
    const overview = propertyDetailsData?.overview;
    const location = propertyDetailsData?.location;

    const projectCategory = (overview?.projectCategory.trim() ?? 'category').replace(/\s+/g, '-');
    let projectType;
    if (overview?.projectType?.length > 0) {
        projectType = overview.projectType.map(type => type.value.trim().replace(/\s+/g, '-')).join("-");
    }else{
      projectType = 'type';
    }
    const city = (location?.city.trim() ?? 'city').replace(/\s+/g, '-');
    const sector = (location?.sector.trim() ?? 'sector').replace(/[\s,]+/g, '-');
    const area = (location?.area.trim() ?? 'area').replace(/[\s,]+/g, '-').replace("-#", '');
    const projectName = (overview?.projectName.trim() ?? 'projectName').replace(/\s+/g, '-');

    return `${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${propertyDetails._id}`;
};

const propertyUrl = constructPropertyUrl(propertyDetails)

  const formattedCreatedAt =
    createdDate && format(new Date(createdDate), "dd-MM-yyyy 'at' hh:mm aaa");

    const  numDifferentiation = (value) => {
      const val = Math.abs(value)
      if (val >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`
      if (val >= 100000) return `${(value / 100000).toFixed(2)} Lac`
      if (val >= 1000) return `${(value / 1000).toFixed(2)}k`
      return value;
    }

  return (
    <Card>
      <CardActionArea sx={{ p: 2 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={13.5} sm={8} md={4}>
            <Box
              sx={{ display: "flex" }}
              onClick={() => router.push(`/details/${propertyUrl}`)}
            >
              <CardMedia
                component="img"
                alt={propertyDetails?.marketing?.tagLine}
                sx={{
                  width: 80,
                  height: 54,
                  borderRadius: "8px",
                  mr: 2,
                }}
                image={propertyDetails?.marketing?.image}
              />
              <Box
                sx={{ flex: 1 }}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
                <Typography variant="caption">
                  {propertyDetails?.overview?.builder}
                </Typography>
                <Typography variant="subtitle2">
                  {propertyDetails?.overview?.projectName}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2.5} sx={{ display: { xs: "block", sm: "none" } }}>
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
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            <Typography variant="caption">
              {propertyDetails?.location?.area}
            </Typography>
            <Typography variant="subtitle2">
              {propertyDetails?.location?.sector}
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2.5}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            {(propertyDetails?.unitsPlan?.averagePrice ||
              propertyDetails?.unitsPlan?.planList[0]?.areaUnit) && (
                <Typography variant="caption">
                  {propertyDetails?.unitsPlan?.averagePrice +
                    "/" +
                    propertyDetails?.unitsPlan?.planList[0]?.areaUnit}
                </Typography>
              )}
            {(propertyDetails?.unitsPlan?.minPriceRange ||
              propertyDetails?.unitsPlan?.maxPriceRange) && (
                <Typography variant="subtitle2">
                  ₹ {numDifferentiation(propertyDetails?.unitsPlan?.minPriceRange)} - ₹{" "}
                  {numDifferentiation(propertyDetails?.unitsPlan?.maxPriceRange)}
                </Typography>
              )}
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={1.5}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            <Typography variant="caption">
              {propertyDetails?.layout?.totalUnits} Units
            </Typography>
            <Typography variant="subtitle2">{`${propertyDetails?.layout?.area
              } ${propertyDetails?.layout?.areaUnit
                ? propertyDetails?.layout?.areaUnit
                : ""
              }`}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            <Typography variant="caption">
              {(propertyDetails?.unitsPlan?.uniqueLayouts?.length || propertyDetails?.unitsPlan?.planList?.length) === 1
                ? `${propertyDetails?.unitsPlan?.uniqueLayouts?.length || propertyDetails?.unitsPlan?.planList?.length} layout`
                : `${propertyDetails?.unitsPlan?.uniqueLayouts?.length || propertyDetails?.unitsPlan?.planList?.length} layouts`}
            </Typography>
            <Typography variant="subtitle2">
              {propertyDetails?.unitsPlan?.uniqueLayouts.length ?
                propertyDetails?.unitsPlan?.uniqueLayouts
                  ?.map((item) => item)
                  .join(", ") : propertyDetails?.unitsPlan?.planList
                  ?.map((item) => `${item?.width}*${item?.length}`)
                  .join(", ")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            <Typography variant="caption">
              {propertyDetails?.overview?.status}
            </Typography>
            <Typography variant="subtitle2">
              {propertyDetails?.overview?.launchYear} -{" "}
              {propertyDetails?.overview?.completionYear}
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            md={2}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Card
              sx={{
                width: "fit-content",
                backgroundColor: colors?.BLACK,
                // borderRadius: "4px !important",
                m: 0,
                ml: "auto !important",
              }}
              // onClick={() => router.push("/research")}
              onClick={() => router.push(`/details/${propertyUrl}`)}
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
                {propertyDetails?.overallAssessment?.score
                  ? propertyDetails?.overallAssessment?.score.toFixed()
                  : "00"}
              </Typography>
            </Card>
          </Grid>
          {/* <Grid
            item
            xs={8}
            sm={2.5}
            md={1}
            onClick={() => router.push(`/details/${propertyDetails._id}`)}
          >
            <Typography variant="caption">Enquiries</Typography>
            <Typography variant="subtitle2">345</Typography>
          </Grid> */}
          {/* <Grid item sm={1.5} md={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
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
          </Grid> */}
        </Grid>
      </CardActionArea>
      {isShortListPageCard && <Divider />}
      {isShortListPageCard && (
        <CardActions sx={{ textAlign: "end" }}>
          <Chip
            icon={<ThumbUpIcon style={{ color: "#276ef1", mr: 1 }} />}
            // label="Liked on 23-09-2023 at 09:30 AM"
            label={`Liked on ${formattedCreatedAt}`}
            onClick={() => { }}
            size="small"
            sx={{ fontSize: "0.75rem" }}
          />
        </CardActions>
      )}
    </Card>
  );
}

export default PropertyCard;
