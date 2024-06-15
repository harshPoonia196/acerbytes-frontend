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
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "utills/AuthContext";
import CircularWithValueLabel from "Components/CommonLayouts/CircularProgressWithLabel";
import { shortPriceFormatter } from "utills/CommonFunction";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { formatNumberWithCommas } from "utills/CommonFunction";

function PropertyCard(props) {
  const router = useRouter();
  const [priceRange, setAmount] = useState({});
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
    const { uniqueLayouts, planList } = unitsPlan || {};
    const withoutUniqueLayout = (
      planList?.filter((item) => !item.propertyLayout) || []
    ).map((item) => `${item?.width}*${item?.length}`);
    return [...(uniqueLayouts || []), ...withoutUniqueLayout];
  }, [unitsPlan]);

  useEffect(() => {
    const getPriceTag = shortPriceFormatter(unitsPlan?.minPriceRange);

    const [minPrice, tag] = getPriceTag.split(" ");
    const finalMinPrice = Math.round(minPrice * 10) / 10;

    const getMaxPriceTag = shortPriceFormatter(unitsPlan?.maxPriceRange);

    const [maxPrice, maxTag] = getMaxPriceTag.split(" ");
    const finalMaxPrice = Math.round(maxPrice * 10) / 10;

    setAmount({
      ...priceRange,
      minPrice: { price: finalMinPrice, tag },
      maxPrice: { price: finalMaxPrice, tag: maxTag },
    });
  }, []);

  const formatUnit = () => {
    const finalData = [];

    layoutData.sort().map((item, index) => {
      let nextUnit = layoutData[index + 1]?.split(" ")[1];
      let spitedValue = item.split(" ");

      const num = spitedValue[0];
      const unit = spitedValue[1];

      if (!unit) {
        const width = num.split("*")[0];
        const { areaUnit } =
          unitsPlan?.planList.find((i) => i.width === Number(width)) || {};

        finalData.push(`${num} ${areaUnit}`);
      } else if (unit === nextUnit) {
        finalData.push(num);
      } else {
        finalData.push(`${num} ${unit}`);
      }
    });

    return finalData.join(", ");
  };

  function roundOff(number) {
    if (number % 1 !== 0) {
      return Math.round(number * 10) / 10;
    }
    return number;
  }

  const categorizeScore = (score) => {
    if (score >= 0 && score <= 20) return "Poor";
    if (score >= 21 && score <= 40) return "Average";
    if (score >= 41 && score <= 60) return "Good";
    if (score >= 61 && score <= 80) return "Very good";
    if (score >= 81 && score <= 90) return "Excellent";
    if (score >= 91 && score <= 100) return "Outstanding";
    return "invalid";
  };

  return (
    <Card>
      <CardActionArea sx={{ p: 2 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16} sm={8} lg={4.5} sx={{ display: "flex" }}>
            <Box
              sx={{ display: "flex", flex: 1 }}
              onClick={() => router.push(`/details/${propertyUrl}`)}
            >
              <Image
                alt={marketing?.tagLine}
                height={54}
                width={80}
                loading="lazy"
                src={marketing?.image}
                style={{
                  borderRadius: "8px",
                  marginRight: 16,
                }}
              />
              <Box
                sx={{ flex: 1 }}
                onClick={() => router.push(`/details/${propertyUrl}`)}
              >
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
                  variant="subtitle2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {`${overview?.builder} ${overview?.projectName}`}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <Tooltip title={categorizeScore(propertyDetails?.overallAssessment?.score)}>
                <CircularWithValueLabel
                  progress={
                    overallAssessment?.score
                      ? overallAssessment.score.toFixed()
                      : 0
                  }
                  onClick={() => router.push(`/details/${propertyUrl}`)}
                  tooltiptext={`AB scores ${categorizeScore(propertyDetails?.overallAssessment?.score)}`}
                />
              </Tooltip>
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            lg={1.5}
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
            xs={8}
            sm={2.5}
            lg={1.5}
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
            sm={1.5}
            sx={{
              display: { xs: "none", sm: "block", lg: "none" },
              textAlign: "end",
            }}
          >
            <Tooltip title={categorizeScore(propertyDetails?.overallAssessment?.score)}>
            <CircularWithValueLabel
              progress={
                overallAssessment?.score ? overallAssessment.score.toFixed() : 0
              }
              onClick={() => router.push(`/details/${propertyUrl}`)}
              tooltiptext={`AB scores ${categorizeScore(propertyDetails?.overallAssessment?.score)}`}
            />
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={8}
            sm={8}
            lg={3}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            {(unitsPlan?.averagePrice || unitsPlan?.planList[0]?.areaUnit) && (
              <Typography variant="caption">
                {"₹ " +
                  unitsPlan.averagePrice.toLocaleString() +
                  "/" +
                  unitsPlan.planList[0]?.areaUnit}
              </Typography>
            )}
            {(unitsPlan?.minPriceRange || unitsPlan?.maxPriceRange) && (
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                ₹ {shortPriceFormatter(unitsPlan.minPriceRange)} - ₹{" "}
                {shortPriceFormatter(unitsPlan.maxPriceRange)}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={8}
            sm={4}
            lg={2.5}
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
            xs={8}
            sm={4}
            lg={2}
            onClick={() => router.push(`/details/${propertyUrl}`)}
          >
            <Typography variant="caption">{overview?.status}</Typography>
            <Typography variant="subtitle2">
              {overview?.launchYear} - {overview?.completionYear}
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sm={1.5}
            lg={1}
            sx={{ display: { xs: "none", lg: "block" }, textAlign: "end" }}
          >
            <Tooltip title={categorizeScore(propertyDetails?.overallAssessment?.score)}>
            <CircularWithValueLabel
              progress={
                overallAssessment?.score ? overallAssessment.score.toFixed() : 0
              }
              onClick={() => router.push(`/details/${propertyUrl}`)}
              tooltiptext={`AB scores ${categorizeScore(propertyDetails?.overallAssessment?.score)}`}
            />
            </Tooltip>
          </Grid>
        </Grid>
      </CardActionArea>
      {userDetails.role === "user" && isShortListPageCard && <Divider />}
      {userDetails.role === "user" && isShortListPageCard && (
        <CardActions sx={{ textAlign: "end" }}>
          <Chip
            icon={<ThumbUpIcon style={{ color: "#276ef1", mr: 1 }} />}
            label={`Liked on ${formattedCreatedAt}`}
            onClick={() => {}}
            size="small"
            sx={{ fontSize: "0.75rem" }}
          />
        </CardActions>
      )}
    </Card>
  );
}

export default PropertyCard;
