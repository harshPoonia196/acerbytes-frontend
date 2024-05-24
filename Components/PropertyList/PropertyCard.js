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
  Tooltip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useMemo } from "react";
import { useAuth } from "utills/AuthContext";
import CircularWithValueLabel from "Components/CommonLayouts/CircularProgressWithLabel";
import { getColorForProgressBar, shortPriceFormatter } from "utills/CommonFunction";
import Image from "next/image";

function PropertyCard(props) {
  const { userDetails } = useAuth();
  const { propertyDetails, isShortListPageCard, createdDate } = props;
  const router = useRouter();
  const constructPropertyUrl = (propertyDetailsData) => {
    const overview = propertyDetailsData?.overview;
    const location = propertyDetailsData?.location;

    const projectCategory = encodeURIComponent((overview?.projectCategory.trim() ?? 'category').replace(/\s+/g, '-').replace(/\//g, '-'));
    let projectType;
    if (overview?.projectType?.length > 0) {
      projectType = overview.projectType.map(type => encodeURIComponent(type.value.trim().replace(/\s+/g, '-').replace(/\//g, '-'))).join("-");
    } else {
      projectType = 'type';
    }
    const city = encodeURIComponent((location?.city.trim() ?? 'city').replace(/\s+/g, '-').replace(/\//g, '-'));
    const sector = encodeURIComponent((location?.sector.trim() ?? 'sector').replace(/[\s,]+/g, '-').replace(/\//g, '-'));
    const area = encodeURIComponent((location?.area.trim() ?? 'area').replace(/[\s,]+/g, '-').replace("-#", '').replace(/\//g, '-'));
    const projectName = encodeURIComponent((overview?.projectName.trim() ?? 'projectName').replace(/\s+/g, '-').replace(/\//g, '-'));


    return `${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${propertyDetails._id}`;
  };

  const propertyUrl = constructPropertyUrl(propertyDetails)

  const formattedCreatedAt =
    createdDate && format(new Date(createdDate), "dd-MM-yyyy 'at' hh:mm aaa");

  const layoutCount = useMemo(() => {
    return propertyDetails?.unitsPlan?.uniqueLayouts?.length + propertyDetails?.unitsPlan?.planList?.filter(item => !item.propertyLayout)?.length
  }, [propertyDetails])

  const layoutData = useMemo(() => {
    const withoutUniqueLayout = [...propertyDetails?.unitsPlan?.planList?.filter(item => !item.propertyLayout)]?.map((item) => `${item?.width}*${item?.length}`)
    return [...propertyDetails?.unitsPlan?.uniqueLayouts, ...withoutUniqueLayout]
  }, [propertyDetails])


  return (
    <Card>
      <CardActionArea sx={{ p: 2 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16} sm={8} lg={4.5} sx={{ display: 'flex' }}>
            <Box
              sx={{ display: "flex", flex: 1 }}
              onClick={() => router.push(`/details/${propertyUrl}`)}
            >
              <Image alt={propertyDetails?.marketing?.tagLine} height={54} width={80}
                loading="lazy" src={propertyDetails?.marketing?.image}
                style={{
                  borderRadius: "8px",
                  marginRight: 16,
                }} />
              <Box
                sx={{ flex: 1 }}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
                <Typography variant="caption">
                  {propertyDetails?.location?.city}&#183;PRS&#183;{propertyDetails?.property_id}
                </Typography>
                <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                  {propertyDetails?.overview?.builder + ' ' + propertyDetails?.overview?.projectName}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <CircularWithValueLabel progress={propertyDetails?.overallAssessment?.score
                ? propertyDetails?.overallAssessment?.score.toFixed() : 0}
                // onClick={() => router.push("/research")}
                onClick={() => router.push(`/details/${propertyUrl}`)} />
            </Box>
          </Grid>
          <Grid item xs={8} sm={4} lg={1.5} onClick={() => router.push(`/details/${propertyUrl}`)}>
            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
              {propertyDetails?.location?.area}
            </Typography>
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
              {propertyDetails?.location?.sector}
            </Typography>
          </Grid>
          <Grid item xs={8} sm={2.5} lg={1.5}
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
          <Grid item sm={1.5} sx={{ display: { xs: 'none', sm: 'block', lg: 'none' }, textAlign: 'end' }}>
            <CircularWithValueLabel progress={propertyDetails?.overallAssessment?.score
              ? propertyDetails?.overallAssessment?.score.toFixed() : 0}
              // onClick={() => router.push("/research")}
              onClick={() => router.push(`/details/${propertyUrl}`)} tooltiptext={`AB scores *`} />
          </Grid>
          <Grid item xs={8} sm={8} lg={3}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            {(propertyDetails?.unitsPlan?.averagePrice ||
              propertyDetails?.unitsPlan?.planList[0]?.areaUnit) && (
                <Typography variant="caption">
                  {'₹ ' + propertyDetails?.unitsPlan?.averagePrice.toLocaleString() +
                    "/" +
                    propertyDetails?.unitsPlan?.planList[0]?.areaUnit}
                </Typography>
              )}
            {(propertyDetails?.unitsPlan?.minPriceRange ||
              propertyDetails?.unitsPlan?.maxPriceRange) && (
                <Typography variant="subtitle2">
                  ₹ {shortPriceFormatter(propertyDetails?.unitsPlan?.minPriceRange)} - ₹{" "}
                  {shortPriceFormatter(propertyDetails?.unitsPlan?.maxPriceRange)}
                </Typography>
              )}
          </Grid>
          <Grid item xs={8} sm={4} lg={2.5}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            <Typography variant="caption">
              {(layoutCount) === 1
                ? `${layoutCount} layout`
                : `${layoutCount} layouts`}
            </Typography>
            <Typography variant="subtitle2">
              {layoutData.join(", ")}
            </Typography>
          </Grid>

          <Grid item xs={8} sm={4} lg={2}
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
          <Grid item xs={8} sm={1.5} lg={1} sx={{ display: { xs: 'none', lg: 'block' }, textAlign: 'end' }}>
            <CircularWithValueLabel progress={propertyDetails?.overallAssessment?.score
              ? propertyDetails?.overallAssessment?.score.toFixed() : 0}
              // onClick={() => router.push("/research")}
              onClick={() => router.push(`/details/${propertyUrl}`)}
              tooltiptext={`AB scores Excellent *`}
            />
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
      {userDetails.role === "user" && isShortListPageCard && <Divider />}
      {userDetails.role === "user" && isShortListPageCard && (
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
