import React from "react";
import {
  Tabs,
  Tab,
  Card,
  Box,
  Typography,
  tabsClasses,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CircularWithValueLabel from "Components/CommonLayouts/CircularProgressWithLabel";
import { boxShadowBottom } from "utills/Constants";
import { capitalLizeName, shortPriceFormatter } from "utills/CommonFunction";

function TopMenu(props) {
  const { value, handleChange, list, topMenu } = props;

  const {
    location = {},
    marketing = {},
    overview = {},
    unitsPlan = {},
    overallAssessment = {},
  } = topMenu;
  const { sector, state, city, area } = location;
  const { builder, projectName, status } = overview;
  const { maxPriceRange, minPriceRange } = unitsPlan;

  const router = useRouter();
  const defaultValue = list.length > 0 ? list[0].hash : undefined;
  return (
    <>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              {value && value !== "project" && (
                <Image
                  src={marketing?.image}
                  width={100}
                  height={50}
                  alt="Picture of the author"
                />
              )}
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "700 !important",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {builder} · {capitalLizeName(projectName)}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "700 !important",
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  {builder} · {projectName}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ alignSelf: "center", textTransform: "capitalize", mb: "5px" }}
                >
                  {sector}, {area}, {city}, {state}
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                  {status && (
                    <>
                      <Chip label={status} color="primary" size="small" />
                      <Chip
                        label={`₹ ${shortPriceFormatter(
                          topMenu?.unitsPlan?.minPriceRange
                        )} - ₹ 
                        ${shortPriceFormatter(
                          topMenu?.unitsPlan?.maxPriceRange
                        )}`}
                        color="primary"
                        size="small"
                        style={{ marginLeft: 10 }}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box>
              <CircularWithValueLabel
                onClick={() => router.push("/research")}
                progress={overallAssessment?.score}
                islarge
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ alignSelf: "center" }}>
            {status && <Chip label={status} color="primary" size="small" />}
            <Chip
              label={`₹ ${shortPriceFormatter(minPriceRange)} - ₹ 
            ${shortPriceFormatter(maxPriceRange)}`}
              color="primary"
              size="small"
              style={{ marginLeft: 10 }}
            />
          </Box>
          <Box>
            <CircularWithValueLabel
              onClick={() => router.push("/research")}
              progress={overallAssessment?.score}
            />
          </Box>
        </Box>
      </Card>

      <Tabs
        value={value || defaultValue}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="visible arrows tabs example"
        className="propertyTabs"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          boxShadow: "-1px 8px 6px -6px gainsboro!important",
        }}
      >
        {list.map((current) => (
          <Tab
            key={current.hash}
            label={current.text}
            value={current.hash}
            onClick={() => handleChange(current.hash)}
          />
        ))}
      </Tabs>
    </>
  );
}

export default TopMenu;
