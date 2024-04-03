import React from "react";
import { Grid, Card, Typography, Box, Divider, Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";

function UnitsPlanSection(props) {
  const { refCallback, unitsPlan } = props;
  const router = useRouter();
  const GridItemWithCard = (props) => {
    const { children, styles, boxStyles, ...rest } = props;
    return (
      <Grid
        item
        {...rest}
        sx={{
          textAlign: "center",
          ...styles,
        }}
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            p: 2,
            borderRadius: "8px",
            boxShadow:
              "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
            ...boxStyles,
          }}
        >
          {children}
        </Box>
      </Grid>
    );
  };

  return (
    <Grid item xs={12} ref={refCallback} id='unitsPlan' >
      <Card>
        <Box sx={{ p: 2, display: 'flex' }}>
          <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
            Units plan
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
              {/* <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  width: "fit-content",
                  color: "white",
                  p: 0.5,
                  px: 1,
                  cursor: 'pointer'
                }}
              >
                {unitsPlan?.sectionScore ? unitsPlan?.sectionScore.toFixed() : "00"}
              </Typography> */}
            </Card>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {unitsPlan?.planList.length && unitsPlan?.planList?.map((unit, index) => (
              <GridItemWithCard
                key={unit._id}
                xs={6}
                sm={3}
                boxStyles={{ backgroundColor: "none" }}
              >
                <Typography variant="h3">{unit?.name}</Typography>
                <Typography variant="subtitle1">{unit?.propertyLayout ? unit?.propertyLayout : `${unit?.width}*${unit?.length}`}</Typography>
                <Typography variant="h5">{unit?.areaValue} {unit?.areaUnit}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Bsp: ₹ {new Intl.NumberFormat('en-IN').format(unit?.bsp).replace('₹', '')}
                </Typography>
              </GridItemWithCard>
            ))}
          </Grid>
        </Box>
      </Card>
    </Grid>
  )
}

export default UnitsPlanSection;
