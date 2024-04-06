import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Divider, Chip
} from "@mui/material";
import NewKeyValuePairStructure from "Components/CommonLayouts/NewKeyValuePairStructure";
import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import colors from "styles/theme/colors";
import CircularProgressWithIcon from 'Components/CommonLayouts/CircularProgressWithIcon'
import HandshakeIcon from '@mui/icons-material/Handshake'
import BusinessIcon from '@mui/icons-material/Business'
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

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
    console.log(AllLocationData)
    return <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} >
      <Card sx={{ width: '50%' }}>
        <MapFrame mapUrl={mapUrl} />
      </Card>
      <Card sx={{ p: 2, textAlign: "center", width: '50%' }}>
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
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 1 }}>
                <CircularProgressWithIcon icon={<HandshakeIcon />} />
              </Box>
              <Box>
                <Typography variant="h6">Performance</Typography>
                <Typography variant="h4">
                  {alloverviewData?.sectionScore
                    ? alloverviewData?.sectionScore.toFixed()
                    : "0"}
                  <Typography variant="h6" component="span">
                    {' / 10'}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 1 }}>
                <CircularProgressWithIcon icon={<BusinessIcon />} />
              </Box>
              <Box>
                <Typography variant="h6">Layout and amenities</Typography>
                <Typography variant="h4">
                  {overviewData?.layout?.sectionScore
                    ? overviewData?.layout?.sectionScore.toFixed()
                    : "0"}
                  <Typography variant="h6" component="span">
                    {' / 10'}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 1 }}>
                <CircularProgressWithIcon icon={<WhereToVoteIcon />} />
              </Box>
              <Box>
                <Typography variant="h6">Location</Typography>
                <Typography variant="h4">
                  {overviewData?.location?.sectionScore
                    ? overviewData?.location?.sectionScore.toFixed()
                    : '0'}
                  <Typography variant="h6" component="span">
                    {' / 10'}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 1 }}>
                <CircularProgressWithIcon icon={<CurrencyRupeeIcon />} />
              </Box>
              <Box>
                <Typography variant="h6">Value for money</Typography>
                <Typography variant="h4">
                  {overviewData?.valueForMoney?.sectionScore
                    ? overviewData?.valueForMoney?.sectionScore.toFixed()
                    : "0"}
                  <Typography variant="h6" component="span">
                    {' / 10'}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Chip label={'Under construction'} color='primary' size='small' sx={{ fontSize: '1rem' }} />
            <Typography variant="h6">
              2004-2008
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Chip label={'₹ 1Cr - ₹ 2.75Cr'} color='primary' size='small' sx={{ fontSize: '1rem' }} />
            <Typography variant="h6">
              ₹ 2,500 / sqft
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box >
  }

  return (
    <>
      <Container maxWidth='md'>
        <Box id='project' >
          <Card sx={{ height: 'fit-content' }}>
            <img src={overviewData?.marketing?.image} style={{ width: '100%' }} />
          </Card>
          <Box sx={{ my: 2 }}>
            <OverviewRatingCard />
          </Box>
        </Box>
        <Card id="builder" >
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
              value={Array.from(new Set(AllUnitsPlan?.planList
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
