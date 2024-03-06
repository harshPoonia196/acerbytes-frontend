import React from "react";
import { Grid, Card, Typography, Box, Divider } from "@mui/material";
import NewKeyValuePairStructure from "Components/CommonLayouts/NewKeyValuePairStructure";
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";

function LocationSection(props) {
  const { locationData, refCallback } = props;
  if (!(locationData?.assessment || locationData?.sectionScore)) {
    return null;
}
  const router = useRouter();

  return (
    <Grid item xs={12} ref={refCallback} id="location">
      <Card>
        <Box sx={{ p: 2, display: "flex" }}>
          <Typography variant="h4" sx={{ flex: 1, alignSelf: "center" }}>
            Location
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
                {locationData?.sectionScore ? locationData?.sectionScore : "00"}
              </Typography>
            </Card>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={1}>
            {locationData?.assessment &&
              Object.entries(locationData?.assessment).map(([items, value]) => {
                if (value.isApplicable) {
                  return (
                    <NewKeyValuePairStructure
                      key={items}
                      label={items}
                      value={value.rating}
                      isRating={value.isApplicable}
                    />
                  );
                }
                return null;
              })}
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
}

export default LocationSection;
