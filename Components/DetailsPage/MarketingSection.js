import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import NewKeyValuePairStructure from "Components/CommonLayouts/NewKeyValuePairStructure";
import Image from "next/image";
import React, { useRef, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import colors from "styles/theme/colors";

function MarketingSection(props) {
  const { overviewData } = props;
  const alloverviewData = overviewData?.overview;
  const AllLocationData = overviewData?.location;
  const AllUnitsPlan = overviewData?.unitsPlan;

  const extractUrl = (htmlString) => {
    const matches = htmlString?.match(/src="([^"]+)"/);
    return matches ? matches[1] : null;
  }

  const mapUrl = extractUrl(AllLocationData?.googleMapLink);

  const categorizeScore = (score) => {
    if (score >= 0 && score <= 20) return 'Poor';
    if (score >= 21 && score <= 40) return 'Average';
    if (score >= 41 && score <= 60) return 'Good';
    if (score >= 61 && score <= 80) return 'Very good';
    if (score >= 81 && score <= 90) return 'Excellent';
    if (score >= 91 && score <= 100) return 'Outstanding';
    return 'invalid';
  };


  const MapFrame = ({ mapUrl }) => {
    console.log(mapUrl)
    return <iframe
      src={mapUrl}
      style={{ border: 0 }}
      height="100%"
      width="100%"
      loading="lazy"
    />
  }

  const OverviewRatingCard = () => {
    return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
      <Card sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h2">
          {`${alloverviewData?.builder} · ${alloverviewData?.projectName}`}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <LocationOnIcon fontSize="small" sx={{ alignSelf: 'center' }} />
          <Typography variant="h4">
            {`${AllLocationData?.city}, ${AllLocationData?.state}`}
          </Typography>
        </Box>
      </Card>
      <Card sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h1">
          {overviewData?.overallAssessment?.score
            ? overviewData?.overallAssessment?.score.toFixed()
            : "-"}
          <Typography variant="h6" component="span">
            {' / 100'}
          </Typography>
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {categorizeScore(overviewData?.overallAssessment?.score)}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h2">
              {alloverviewData?.sectionScore
                ? alloverviewData?.sectionScore.toFixed()
                : "0"}
              <Typography variant="h6" component="span">
                {' / 10'}
              </Typography>
            </Typography>
            <Typography variant="h6">Property</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2">
              {overviewData?.layout?.sectionScore
                ? overviewData?.layout?.sectionScore.toFixed()
                : "0"}
              <Typography variant="h6" component="span">
                {' / 10'}
              </Typography>
            </Typography>
            <Typography variant="h6">Layout and amenities</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2">
              {overviewData?.location?.sectionScore
                ? overviewData?.location?.sectionScore.toFixed()
                : '0'}
              <Typography variant="h6" component="span">
                {' / 10'}
              </Typography>
            </Typography>
            <Typography variant="h6">Location</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2">
              {overviewData?.valueForMoney?.sectionScore
                ? overviewData?.valueForMoney?.sectionScore.toFixed()
                : "0"}
              <Typography variant="h6" component="span">
                {' / 10'}
              </Typography>
            </Typography>
            <Typography variant="h6">Value for money</Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Box id='project' sx={{ display: { xs: 'block', evmd: 'flex' }, gap: 2 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card sx={{ maxHeight: 400 }}>
              <img src={overviewData?.marketing?.image} style={{ width: '100%' }} />
            </Card>
            <Card sx={{ display: { xs: "none", evmd: "block" } }}>
              <MapFrame mapUrl={mapUrl} />
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: { xs: "none", evmd: "block" }
              }}
            >
              <OverviewRatingCard />
            </Box>
          </Box>
        </Box>
      </Container>
      <Container maxWidth="evmd" sx={{ py: "0 !important" }}>
        <Box sx={{ display: { xs: "block", evmd: "none" }, mb: 2 }}>
          <OverviewRatingCard />
        </Box>
        <Card sx={{ display: { xs: "block", evmd: "none" }, mb: 2 }}>
          <Box>
            <MapFrame mapUrl={mapUrl} />
          </Box>
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
                    cursor: "pointer",
                  }}
                >
                  {alloverviewData?.sectionScore
                    ? alloverviewData?.sectionScore.toFixed()
                    : "00"}
                </Typography>
              </Card>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={1} sx={{ p: 2 }}>
            <NewKeyValuePairStructure
              label="Builder"
              value={alloverviewData?.builder}
            />
            <NewKeyValuePairStructure
              label="Project name"
              value={alloverviewData?.projectName}
            />
            <NewKeyValuePairStructure
              label="Project type"
              value={Array.from(new Set (AllUnitsPlan?.planList
                ?.map((item) => item?.propertyType)))
                .join(", ")}
            />
            <NewKeyValuePairStructure
              label="Project category"
              value={alloverviewData?.projectCategory}
            />
            <NewKeyValuePairStructure
              label="Phase"
              value={alloverviewData?.phase}
            />
            <NewKeyValuePairStructure
              label="Launch"
              value={alloverviewData?.launchYear}
            />
            <NewKeyValuePairStructure
              label="Completion"
              value={alloverviewData?.completionYear}
            />
            <NewKeyValuePairStructure
              label="Location"
              value={`${AllLocationData?.area}, ${AllLocationData?.city}, ${AllLocationData?.state}`}
            />
            <NewKeyValuePairStructure
              label="Status"
              value={alloverviewData?.status}
            />
            {alloverviewData?.constructionProgress && (
              <NewKeyValuePairStructure
                label="Speed"
                value={alloverviewData?.constructionProgress}
              />
            )}
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default MarketingSection;
