import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import NewKeyValuePairStructure from "Components/CommonLayouts/NewKeyValuePairStructure";
import React, { useRef, useState } from "react";
import colors from "styles/theme/colors";

function MarketingSection(props) {
  const { overviewData } = props;
  const alloverviewData = overviewData?.overview;
  const AllLocationData = overviewData?.location;

  const myDivRef = useRef(null);

  const [width, setWidth] = useState();

  // useEffect(() => {
  //     if (myDivRef.current) {
  //         const myDiv = myDivRef.current;
  //         const widthCal = myDiv.offsetWidth;
  //         setWidth(widthCal)
  //         console.log('Width of the div:', width, 'pixels');
  //     }
  // }, []);

  const  extractUrl = (htmlString) => {
    const matches = htmlString?.match(/src="([^"]+)"/);
    return matches ? matches[1] : null;
  }

  const mapUrl = extractUrl(AllLocationData?.googleMapLink);

  return (
    <>
      <Card
        sx={{
          background: "whitesmoke",
          display: "flex",
          height: { xs: "50vh", sm: "70vh" },
          position: "relative",
        }}
        id="project"
      >
        <Box
          style={{ backgroundImage: `url(${overviewData?.marketing?.image})` }}
          sx={{
            flex: 1,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>

        <Box
          sx={{
            backgroundImage:
              "linear-gradient(240deg,transparent,rgba(37,37,37,.21),#111);",
            height: "70vh",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></Box>
        <Card
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            opacity: 0.85,
            display: "flex",
            maxWidth: "calc(100% - 48px)",
          }}
        >
          <Box ref={myDivRef} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h2">
              {`${alloverviewData?.builder} - ${alloverviewData?.projectName}`}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {`${AllLocationData?.city}, ${AllLocationData?.state}`}
            </Typography>
            <Typography variant="h1">
              {overviewData?.overallAssessment?.score
                ? overviewData?.overallAssessment?.score.toFixed()
                : "48"}
              <Typography variant="h6" component="span">
                {" "}
                / 100
              </Typography>
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Excellent
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="h2">
                  {alloverviewData?.sectionScore
                    ? alloverviewData?.sectionScore.toFixed()
                    : "8"}
                  <Typography variant="h6" component="span">
                    / 10
                  </Typography>
                </Typography>
                <Typography variant="h6">Property</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h2">
                  {overviewData?.layout?.sectionScore
                    ? overviewData?.layout?.sectionScore.toFixed()
                    : "6"}
                  <Typography variant="h6" component="span">
                    {" "}
                    / 10
                  </Typography>
                </Typography>
                <Typography variant="h6">Layout and amenities</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h2">
                  {overviewData?.location?.sectionScore
                    ? overviewData?.location?.sectionScore.toFixed()
                    : "6"}
                  <Typography variant="h6" component="span">
                    / 10
                  </Typography>
                </Typography>
                <Typography variant="h6">Location</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h2">
                  {overviewData?.valueForMoney?.sectionScore
                    ? overviewData?.valueForMoney?.sectionScore.toFixed()
                    : "6"}
                  <Typography variant="h6" component="span">
                    / 10
                  </Typography>
                </Typography>
                <Typography variant="h6">Value for money</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: "none", evmd: "block" } }}>
            <iframe
              src={mapUrl}
              style={{ border: 0 }}
              height="100%"
              width={width}
              loading="lazy"
            />
            
          </Box>
        </Card>
      </Card>
      <Container maxWidth="evmd" sx={{ pb: "0 !important" }}>
        <Card sx={{ display: { xs: "block", evmd: "none" }, mb: 2 }}>
          <Box>
            <iframe
              src={mapUrl}
              style={{ border: 0 }}
              height="100%"
              width={"100%"}
              loading="lazy"
            />
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
              value={alloverviewData?.projectType
                ?.map((item) => item.value)
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
