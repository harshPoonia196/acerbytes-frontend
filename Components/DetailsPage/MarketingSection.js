import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import NewKeyValuePairStructure from "Components/CommonLayouts/NewKeyValuePairStructure";
import React from "react";
import colors from "styles/theme/colors";
import CircularProgressWithIcon from "Components/CommonLayouts/CircularProgressWithIcon";
import CircularProgressWithLabel from "Components/CommonLayouts/CircularProgressWithLabel";
import HandshakeIcon from "@mui/icons-material/Handshake";
import BusinessIcon from "@mui/icons-material/Business";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { shortPriceFormatter, capitalLizeName } from "utills/CommonFunction";
import DOMPurify from "dompurify";
import { memo } from "react";

export const categorizeScore = (score) => {
  if (score >= 0 && score <= 20) return "Poor";
  if (score >= 21 && score <= 40) return "Average";
  if (score >= 41 && score <= 60) return "Good";
  if (score >= 61 && score <= 80) return "Very good";
  if (score >= 81 && score <= 90) return "Excellent";
  if (score >= 91 && score <= 100) return "Outstanding";
  return "invalid";
};

function MarketingSection(props) {
  const { overviewData } = props;
  const allOverviewData = overviewData?.overview;
  const AllLocationData = overviewData?.location;
  const AllUnitsPlan = overviewData?.unitsPlan;

  const extractUrl = (htmlString) => {
    const matches = htmlString?.match(/src="([^"]+)"/);
    return matches ? matches[1] : null;
  };
  const mapUrl = extractUrl(AllLocationData?.googleMapLink);

  const MapFrame = ({ mapUrl }) => {
    return (
      <iframe
        src={mapUrl}
        style={{ border: 0 }}
        height="100%"
        width="100%"
        loading="lazy"
      />
    );
  };

  const OverviewRatingCard = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Card sx={{ width: "100%" }}>
          <MapFrame mapUrl={mapUrl} />
        </Card>

        <Card sx={{ p: 2, textAlign: "center", width: "100%" }}>
          {overviewData?.overallAssessment?.score && (
            <CircularProgressWithLabel
              progress={overviewData?.overallAssessment?.score}
            />
          )}

          <Typography variant="h4" sx={{ mb: 2 }}>
            {categorizeScore(overviewData?.overallAssessment?.score)}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1 }}>
                  <CircularProgressWithIcon
                    score={allOverviewData?.sectionScore}
                    outOf={10}
                    icon={<HandshakeIcon fontSize="1rem" />}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Performance</Typography>
                  <Typography variant="h4">
                    {allOverviewData?.sectionScore
                      ? allOverviewData?.sectionScore.toFixed()
                      : "0"}
                    <Typography variant="h6" component="span">
                      {" / 10"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1 }}>
                  <CircularProgressWithIcon
                    icon={<BusinessIcon fontSize="1rem" />}
                    score={overviewData?.layout?.sectionScore.toFixed()}
                    outOf={10}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Layout and amenities</Typography>
                  <Typography variant="h4">
                    {overviewData?.layout?.sectionScore
                      ? overviewData?.layout?.sectionScore.toFixed()
                      : "0"}
                    <Typography variant="h6" component="span">
                      {" / 10"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1 }}>
                  <CircularProgressWithIcon
                    icon={<WhereToVoteIcon fontSize="1rem" />}
                    score={overviewData?.location?.sectionScore.toFixed()}
                    outOf={10}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Location</Typography>
                  <Typography variant="h4">
                    {overviewData?.location?.sectionScore
                      ? overviewData?.location?.sectionScore.toFixed()
                      : "0"}
                    <Typography variant="h6" component="span">
                      {" / 10"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ mr: 1 }}>
                  <CircularProgressWithIcon
                    icon={<CurrencyRupeeIcon fontSize="1rem" />}
                    score={overviewData?.valueForMoney?.sectionScore.toFixed()}
                    outOf={10}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">Value for money</Typography>
                  <Typography variant="h4">
                    {overviewData?.valueForMoney?.sectionScore
                      ? overviewData?.valueForMoney?.sectionScore.toFixed()
                      : "0"}
                    <Typography variant="h6" component="span">
                      {" / 10"}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {overviewData?.overview?.status && (
                <Chip
                  label={overviewData?.overview?.status}
                  color="primary"
                  size="small"
                  sx={{ mb: 1}}
                />
              )}
              {(overviewData?.overview?.launchYear ||
                overviewData?.overview?.completionYear) && (
                <Typography variant="h6">
                  {overviewData?.overview?.launchYear} -{" "}
                  {overviewData?.overview?.completionYear}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {(overviewData?.unitsPlan?.minPriceRange ||
                overviewData?.unitsPlan?.maxPriceRange) && (
                <Chip
                  label={`₹ ${shortPriceFormatter(
                    overviewData?.unitsPlan?.minPriceRange
                  )} - ₹ 
            ${shortPriceFormatter(overviewData?.unitsPlan?.maxPriceRange)}`}
                  color="primary"
                  size="small"
                  sx={{ mb: 1}}
                />
              )}
              {(overviewData?.unitsPlan?.averagePrice ||
                overviewData?.unitsPlan?.planList[0]) && (
                <Typography variant="h6">
                  {"₹ " +
                    overviewData?.unitsPlan?.averagePrice.toLocaleString() +
                    "/" +
                    overviewData?.unitsPlan?.planList[0]?.areaUnit}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" id="project">
      {/* <Box id="project"> */}
      <Box>
        <Card sx={{ height: "fit-content" }}>
          <img src={overviewData?.marketing?.image} style={{ width: "100%" }} />
        </Card>
        <Box sx={{ my: 2 }}>
          <OverviewRatingCard />
        </Box>
      </Box>
      <Card sx={{ p: 2, mb: 2 }}>
        <div
          className="innerhtmlFont"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              overviewData?.marketing?.metaDescription
            ),
          }}
        />
      </Card>
      <Card id="builder">
        <Box sx={{ display: "flex", p: 2 }}>
          <Typography variant="h4" sx={{ flex: 1, alignSelf: "center" }}>
            Overview
          </Typography>
          <Box sx={{ alignSelf: "center" }}>
            <Card
              sx={{
                width: "fit-content",
                backgroundColor: colors?.BLACK,
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
                  cursor: "pointer",
                }}
              >
                {allOverviewData?.sectionScore
                  ? allOverviewData?.sectionScore.toFixed()
                  : "00"}
              </Typography>
            </Card>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={1} sx={{ p: 2 }}>
          <NewKeyValuePairStructure
            label="Builder"
            value={allOverviewData?.builder}
          />
          <NewKeyValuePairStructure
            label="Project name"
            value={capitalLizeName(allOverviewData?.projectName)}
          />
          <NewKeyValuePairStructure
            label="Project type"
            value={Array.from(
              new Set(AllUnitsPlan?.planList?.map((item) => item?.propertyType))
            ).join(", ")}
          />
          <NewKeyValuePairStructure
            label="Project category"
            value={allOverviewData?.projectCategory}
          />
          <NewKeyValuePairStructure
            label="Phase"
            value={allOverviewData?.phase}
          />
          <NewKeyValuePairStructure
            label="Launch"
            value={allOverviewData?.launchYear}
          />
          <NewKeyValuePairStructure
            label="Completion"
            value={allOverviewData?.completionYear}
          />
          <NewKeyValuePairStructure
            label="Location"
            value={`${AllLocationData?.sector}, ${AllLocationData?.area}, ${AllLocationData?.city}, ${AllLocationData?.state}`}
          />
          <NewKeyValuePairStructure
            label="Status"
            value={allOverviewData?.status}
          />
          {allOverviewData?.constructionProgress && (
            <NewKeyValuePairStructure
              label="Speed"
              value={allOverviewData?.constructionProgress}
            />
          )}
        </Grid>
      </Card>
    </Container>
  );
}

export default memo(MarketingSection);
