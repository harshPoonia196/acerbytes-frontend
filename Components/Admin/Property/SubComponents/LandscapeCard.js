import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  IconButton,
  Divider,
  Rating,
} from "@mui/material";
import { getAllOptions } from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";

import { transformDocuments } from "utills/CommonFunction";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewUnitAreaInputField from "../../../CommonLayouts/NewUnitAreaInputField";
import colors from "styles/theme/colors";
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";

function LandscapeCard({
  isEdit,
  form,
  handleChange,
  errors,
  scoreChange,
  hide,
  selectOptions,
}) {
  const {
    numberOfBuildings,
    maxFloors,
    minFloors,
    totalUnits,
    areaUnit,
    area,
    greenArea,
    unitDensity,
    greenDensity,
    layoutType,
    interiorQuality,
    constructionQuality,
  } = form.layout;

  const [loading, setLoading] = useState(false);

  const { openSnackbar } = useSnackbar();

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };
  const getAllOptionDataList = async () => {
    try {
      let res = await getAllOptions();
      if (res.status === 200) {
        let transform = transformDocuments(res.data.data);
        setSelectOption({ ...transform });
      }
    } catch (error) {
      console.log(error, "err");
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid item xs={12} id="landscape">
      <Card>
        <Box sx={{ display: "flex", p: 2, py: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
          >
            Layout
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
                {form?.layout.sectionScore
                  ? form?.layout.sectionScore.toFixed()
                  : "00"}
              </Typography>
            </Card>
          </Box>
        </Box>
        <Divider />
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
          {!hide.includes("numberOfBuildings") && (
            <NewInputFieldStructure
              isRequired={true}
              label="No of buildings"
              name="numberOfBuildings"
              variant="outlined"
              type={"number"}
              isEdit={isEdit}
              value={numberOfBuildings}
              error={errors?.["layout.numberOfBuildings"]}
              handleChange={(e) =>
                handleChange(e, "layout", "numberOfBuildings")
              }
            />
          )}
          {!hide.includes("layoutType") && (
            <NewMultiSelectAutoCompleteInputStructure
              isRequired={true}
              label="Layout type"
              isEdit={isEdit}
              name="layoutType"
              value={layoutType}
              list={
                selectOptions.layoutType?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [
                  { label: "1 BHK", value: "1 BHK" },
                  { label: "2 BHK", value: "2 BHK" },
                  { label: "3 BHK", value: "3 BHK" },
                  { label: "4 BHK", value: "4 BHK" },
                  { label: "5 BHK", value: "5 BHK" },
                  { label: "6 BHK", value: "6 BHK" },
                  { label: "7 BHK", value: "7 BHK" },
                  { label: "8 BHK", value: "8 BHK" },
                  { label: "9+ BHK", value: "9+ BHK" },
                ]
              }
              error={errors?.["layout.layoutType"]}
              handleChange={(e, newValue) =>
                handleChange(newValue, "layout", "layoutType")
              }
            />
          )}
          {!hide.includes("floors") && (
            <NewInputFieldStructure
              isRequired={true}
              label="Floors (Min)"
              name="minFloors"
              type={"number"}
              variant="outlined"
              isEdit={isEdit}
              value={minFloors}
              error={errors?.["layout.minFloors"]}
              handleChange={(e) => handleChange(e, "layout", "minFloors")}
            />
          )}
          {!hide.includes("floors") && (
            <NewInputFieldStructure
              isRequired={true}
              label="Floors (Max)"
              name="maxFloors"
              variant="outlined"
              isEdit={isEdit}
              type={"number"}
              value={maxFloors}
              error={errors?.["layout.maxFloors"]}
              handleChange={(e) => handleChange(e, "layout", "maxFloors")}
            />
          )}

          {!hide.includes("area") && (
            <NewUnitAreaInputField
              isRequired={true}
              label="Area"
              name="area"
              variant="outlined"
              isEdit={isEdit}
              type={"number"}
              value={area}
              unitValue={areaUnit}
              error={errors?.["layout.area"]}
              handleChange={(e, name) => {
                if (name === "textField") {
                  handleChange(e, "layout", "area");
                } else {
                  handleChange(e, "layout", "areaUnit");
                }
              }}
              units={
                selectOptions.areaUnit?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [{ label: "acres", value: "Acres" }]
              }
            />
          )}
          {!hide.includes("totalUnits") && (
            <NewInputFieldStructure
              isRequired={true}
              label="Units (Total)"
              name="totalUnits"
              type={"number"}
              variant="outlined"
              isEdit={isEdit}
              error={errors?.["layout.totalUnits"]}
              value={totalUnits}
              handleChange={(e) =>
                handleChange(
                  e,
                  "layout",
                  "totalUnits",
                  undefined,
                  true,
                  "unitDensity",
                  area
                    ? (e.target.value / area).toFixed(2)
                    : (e.target.value / 1).toFixed(2)
                )
              }
            />
          )}
          {!hide.includes("greenArea") && (
            <NewUnitAreaInputField
              isRequired={true}
              label="Green area"
              name="greenArea"
              type={"number"}
              variant="outlined"
              isEdit={isEdit}
              units={
                selectOptions.areaUnit?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [{ label: "acres", value: "Acres" }]
              }
              unitValue={areaUnit}
              value={greenArea}
              error={errors?.["layout.greenArea"]}
              handleChange={(e) =>
                handleChange(
                  e,
                  "layout",
                  "greenArea",
                  undefined,
                  true,
                  "greenDensity",
                  area
                    ? (e.target.value / area).toFixed(2)
                    : (e.target.value / 1).toFixed(2)
                )
              }
            />
          )}
          <Grid item xs={0} sm={6}></Grid>
          {!hide.includes("unitDensity") && (
            <NewInputFieldStructure
              label="Unit density"
              name="unitDensity"
              variant="outlined"
              disabled={true}
              isEdit={isEdit}
              value={unitDensity}
              error={errors?.["layout.unitDensity"]}
              handleChange={(e) => handleChange(e, "layout", "unitDensity")}
              InputProps={{
                sx: {
                  "&.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    color: "#808080",
                  },
                },
              }}
            />
          )}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
              >
                Score <span style={{ color: colors.ERROR }}>*</span>
              </Typography>
            </Box>
            <Rating
              onChange={(e) => scoreChange(e, "layout", "unitDensityScore")}
              defaultValue={0}
              value={form.layout.unitDensityScore}
              precision={0.5}
              size="small"
              sx={{ alignSelf: "center", mt: 1 }}
            />
          </Grid>
          {!hide.includes("greenDensity") && (
            <NewInputFieldStructure
              label="Green density"
              name="greenDensity"
              variant="outlined"
              disabled={true}
              isEdit={isEdit}
              value={greenDensity}
              error={errors?.["layout.greenDensity"]}
              handleChange={(e) => handleChange(e, "layout", "greenDensity")}
              InputProps={{
                sx: {
                  "&.Mui-disabled": {
                    backgroundColor: "#f0f0f0",
                    color: "#808080",
                  },
                },
              }}
            />
          )}
          {!hide.includes("greenDensityScore") && (
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                >
                  Score <span style={{ color: colors.ERROR }}>*</span>
                </Typography>
              </Box>
              <Rating
                onChange={(e) => scoreChange(e, "layout", "greenDensityScore")}
                defaultValue={0}
                precision={0.5}
                value={form.layout.greenDensityScore}
                size="small"
                sx={{ alignSelf: "center", mt: 1 }}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
              >
                Construction Quality{" "}
                <span style={{ color: colors.ERROR }}>*</span>
              </Typography>
            </Box>
            <Rating
              onChange={(e) => scoreChange(e, "layout", "constructionQuality")}
              name="construction-quality"
              defaultValue={0}
              value={form.layout.constructionQuality}
              precision={0.5}
              size="small"
              sx={{ alignSelf: "center", mt: 1 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
              >
                Interior Quality <span style={{ color: colors.ERROR }}>*</span>
              </Typography>
            </Box>
            <Rating
              onChange={(e) => scoreChange(e, "layout", "interiorQuality")}
              name="interior-quality"
              defaultValue={0}
              value={form.layout.interiorQuality}
              precision={0.5}
              size="small"
              sx={{ alignSelf: "center", mt: 1 }}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default React.memo(LandscapeCard);
