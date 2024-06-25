import {
  Card,
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
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useMemo } from "react";
import { useAuth } from "utills/AuthContext";
import CircularWithValueLabel from "Components/CommonLayouts/CircularProgressWithLabel";
import { shortPriceFormatter } from "utills/CommonFunction";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { formatNumberWithCommas } from "utills/CommonFunction";
import { categorizeScore } from "Components/DetailsPage/MarketingSection";

function PropertyCard(props) {
  const router = useRouter();
  const { userDetails } = useAuth();
  const { propertyDetails, isShortListPageCard, createdDate } = props;

  const {
    unitsPlan,
    overview,
    location,
    layout,
    marketing,
    overallAssessment,
    property_id,
  } = propertyDetails;

  const { area, totalUnits, areaUnit } = layout;

  const constructPropertyUrl = (propertyDetailsData) => {
    const { overview, location, _id } = propertyDetailsData;

    const projectCategory = encodeURIComponent(
      (overview?.projectCategory.trim() ?? "category")
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
    );

    let projectType;
    if (overview?.projectType?.length > 0) {
      projectType = overview.projectType
        .map((type) =>
          encodeURIComponent(
            type.value.trim().replace(/\s+/g, "-").replace(/\//g, "-")
          )
        )
        .join("-");
    } else {
      projectType = "type";
    }
    const city = encodeURIComponent(
      (location?.city.trim() ?? "city").replace(/\s+/g, "-").replace(/\//g, "-")
    );
    const sector = encodeURIComponent(
      (location?.sector.trim() ?? "sector")
        .replace(/[\s,]+/g, "-")
        .replace(/\//g, "-")
    );
    const area = encodeURIComponent(
      (location?.area.trim() ?? "area")
        .replace(/[\s,]+/g, "-")
        .replace("-#", "")
        .replace(/\//g, "-")
    );
    const projectName = encodeURIComponent(
      (overview?.projectName.trim() ?? "projectName")
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
    );

    return `${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${_id}`;
  };

  const propertyUrl = constructPropertyUrl(propertyDetails);

  const formattedCreatedAt =
    createdDate && format(new Date(createdDate), "dd-MM-yyyy 'at' hh:mm aaa");

  const layoutCount = useMemo(() => {
    const { uniqueLayouts, planList } = unitsPlan || {};
    return (
      (uniqueLayouts?.length || 0) +
      (planList?.filter((item) => !item.propertyLayout)?.length || 0)
    );
  }, [unitsPlan]);

  const layoutData = useMemo(() => {
    const withoutUniqueLayout = [
      ...propertyDetails?.unitsPlan?.planList?.filter(
        (item) => !item.propertyLayout
      ),
    ]?.map((item) => `${item?.width}*${item?.length}`);
    return [
      ...propertyDetails?.unitsPlan?.uniqueLayouts,
      ...withoutUniqueLayout,
    ];
  }, [propertyDetails]);

  const formatUnit = () => {
    const finalData = [];

    layoutData.sort().map((item, index) => {
      let nextUnit =
        layoutData[index + 1] && layoutData[index + 1].split(" ")[1];
      let spitedValue = item.split(" ");

      const num = spitedValue[0];
      const unit = spitedValue[1];

      if (unit === undefined) {
        const width = num.split("*")[0];

        const { areaUnit } = propertyDetails?.unitsPlan?.planList.filter(
          (i) => i.width === Number(width)
        )[0];

        finalData.push(`${num} ${areaUnit}`);
      } else if (unit === nextUnit) {
        finalData.push(num);
      } else {
        finalData.push(`${num} ${unit}`);
      }
    });

    return String(finalData);
  };

  function roundOff(number) {
    if (number % 1 !== 0) {
      return Math.round(number * 10) / 10;
    }
    return number;
  }

  return (
    <Card>
      <CardActionArea>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{
            display: { xs: 'none', md: 'block' }, maxHeight: '100%', width: '150px',
            overflow: 'hidden',
            background: `url(${marketing?.image}) center center / cover`
          }}>
            {/* <img
              onClick={() => router.push(`/details/${propertyUrl}`)}
              alt={marketing?.tagLine}
              src={marketing?.image}
              style={{ height: 'auto', width: '100%' }}
            /> */}
            {/* <Image
              onClick={() => router.push(`/details/${propertyUrl}`)}
              alt={marketing?.tagLine}
              height={100}
              width={180}
              loading="lazy"
              quality={80}
              src={marketing?.image}
              style={{
                borderRadius: "8px",
                objectFit: "contain"
              }}
            /> */}
          </Box>
          <Box sx={{ flex: 1, p: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} xsm={8} md={7} sx={{ display: 'flex' }}>
                <Box sx={{ display: { md: 'none' } }}>
                  <Image
                    onClick={() => router.push(`/details/${propertyUrl}`)}
                    alt={marketing?.tagLine}
                    height={60}
                    width={100}
                    loading="lazy"
                    src={marketing?.image}
                    style={{
                      borderRadius: "8px",
                      marginRight: 16,
                    }}
                  />
                </Box>
                <Box
                  sx={{ flex: 1 }}
                  onClick={() => router.push(`/details/${propertyUrl}`)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    <Typography variant="caption">
                      <Tooltip title="Location">
                        <LocationOnIcon
                          sx={{
                            fontSize: "12px",
                            position: "relative",
                            top: "1.5px",
                          }}
                        />
                      </Tooltip>
                      {location?.city} {property_id}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                    >
                      {`${overview?.builder} ${overview?.projectName}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: { xs: 'block', xsm: 'none' }, mt: 1 }}>
                    {(unitsPlan?.minPriceRange || unitsPlan?.maxPriceRange) && (
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        ₹ {shortPriceFormatter(unitsPlan.minPriceRange)} - ₹{" "}
                        {shortPriceFormatter(unitsPlan.maxPriceRange)}
                      </Typography>
                    )}
                    {(unitsPlan?.averagePrice || unitsPlan?.planList[0]?.areaUnit) && (
                      <Typography variant="caption">
                        {"₹ " +
                          Math.round(unitsPlan.averagePrice).toLocaleString() +
                          "/" +
                          unitsPlan.planList[0]?.areaUnit}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: { xs: 'block', xsm: 'none' } }}>
                  <CircularWithValueLabel
                    progress={
                      overallAssessment?.score ? overallAssessment.score.toFixed() : 0
                    }
                    onClick={() => router.push(`/details/${propertyUrl}`)}
                    tooltipText={`AB scores "${categorizeScore(
                      propertyDetails?.overallAssessment?.score
                    )}"`}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} xsm={4} md={5} sx={{ textAlign: 'end', display: { xs: 'none', xsm: 'flex' }, gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  {(unitsPlan?.minPriceRange || unitsPlan?.maxPriceRange) && (
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      ₹ {shortPriceFormatter(unitsPlan.minPriceRange)} - ₹{" "}
                      {shortPriceFormatter(unitsPlan.maxPriceRange)}
                    </Typography>
                  )}
                  {(unitsPlan?.averagePrice || unitsPlan?.planList[0]?.areaUnit) && (
                    <Typography variant="caption">
                      {"₹ " +
                        Math.round(unitsPlan.averagePrice).toLocaleString() +
                        "/" +
                        unitsPlan.planList[0]?.areaUnit}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <CircularWithValueLabel
                    progress={
                      overallAssessment?.score ? overallAssessment.score.toFixed() : 0
                    }
                    onClick={() => router.push(`/details/${propertyUrl}`)}
                    tooltipText={`AB scores "${categorizeScore(
                      propertyDetails?.overallAssessment?.score
                    )}"`}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                md={6}
                lg={3}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
                <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
                  {location?.area}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {location?.sector}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                md={6}
                lg={3}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
                <Typography variant="caption">
                  {formatNumberWithCommas(totalUnits)} Units
                </Typography>
                <Typography variant="subtitle2">
                  {`${roundOff(Number(area))} ${areaUnit}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                md={6}
                lg={3}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
                <Typography variant="caption">
                  {layoutCount === 1
                    ? `${layoutCount} layout`
                    : `${layoutCount} layouts`}
                </Typography>
                <Typography variant="subtitle2">{formatUnit()}</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sm={3}
                md={6}
                lg={3}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
                <Typography variant="caption">{overview?.status}</Typography>
                <Typography variant="subtitle2">
                  {overview?.launchYear} - {overview?.completionYear}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CardActionArea>
      {userDetails.role === "user" && isShortListPageCard && <Divider />}
      {
        userDetails.role === "user" && isShortListPageCard && (
          <CardActions sx={{ textAlign: "end" }}>
            <Chip
              icon={<ThumbUpIcon style={{ color: "#276ef1", mr: 1 }} />}
              label={`Liked on ${formattedCreatedAt}`}
              onClick={() => { }}
              size="small"
              sx={{ fontSize: "0.75rem" }}
            />
          </CardActions>
        )
      }
    </Card >
  );
}

export default PropertyCard;
