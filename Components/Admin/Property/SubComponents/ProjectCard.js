import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Divider,
  IconButton,
  Rating,
} from "@mui/material";

import {
  capitalLizeName,
  transformDocuments,
  yearList,
} from "utills/CommonFunction";
import EditIcon from "@mui/icons-material/Edit";
import { getAllOptions } from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";

import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";
import colors from "styles/theme/colors";

function ProjectCard({
  isEdit,
  form,
  editPage,
  handleChange,
  errors,
  hide,
  selectOptions,
}) {
  const {
    builder,
    projectName,
    projectCategory,
    projectType,
    phase,
    launchYear,
    completionYear,
    status,
    constructionProgress,
  } = form.overview;

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  // const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  return (
    <>
      {editPage && (
        <Grid item xs={12} id="project">
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  {builder + " " + projectName}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {form.location.city}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "end" }}>
                <Typography variant="h6" sx={{ alignSelf: "center" }}>
                  {form.published ? "Published" : "Draft"}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {form.published
                    ? formatDate(form.createdAt)
                    : "Awaitng action"}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      )}
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: "flex", p: 2, py: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
            >
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
                  {form?.overview.sectionScore
                    ? form?.overview.sectionScore.toFixed()
                    : "00"}
                </Typography>
              </Card>
            </Box>
          </Box>
          <Divider />
          <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
            <NewAutoCompleteInputStructure
              isRequired={true}
              label="Builder"
              name="builder"
              variant="outlined"
              isEdit={isEdit}
              value={builder}
              options={
                selectOptions.builder?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [{ label: "Birla", value: "Birla" }]
              }
              error={errors?.["overview.builder"]}
              handleChange={(e, newValue) => {
                handleChange(newValue.value, "overview", "builder");
              }}
            />
            <Grid item xs={6}>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                >
                  Score <span style={{ color: colors.ERROR }}>*</span>
                </Typography>
              </Box>
              <Rating
                defaultValue={0}
                value={form.overview.builderScore}
                onChange={(e) =>
                  handleChange(
                    e,
                    "overview",
                    "builderScore",
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true
                  )
                }
                precision={0.5}
                size="small"
                sx={{ alignSelf: "center", mt: 1 }}
              />
            </Grid>
            <NewInputFieldStructure
              isRequired={true}
              label={capitalLizeName("Project name")}
              variant="outlined"
              isEdit={isEdit}
              value={projectName}
              error={errors?.["overview.projectName"]}
              handleChange={(e) => {
                handleChange(e, "overview", "projectName");
              }}
            />
            <NewSelectTextFieldStructure
              isRequired={true}
              label="Project category"
              name="projectCategory"
              isEdit={isEdit}
              value={projectCategory}
              error={errors?.["overview.projectCategory"]}
              list={
                selectOptions.category?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [
                  { label: "Residential", value: "Residential" },
                  { label: "Commercial", value: "Commercial" },
                ]
              }
              handleChange={(e) =>
                handleChange(e, "overview", "projectCategory")
              }
            />
            <NewMultiSelectAutoCompleteInputStructure
              isRequired={true}
              label="Project type"
              isEdit={isEdit}
              value={projectType}
              disabled={
                form.overview.projectCategory.length <= 0 ||
                form.overview.projectCategory === undefined
              }
              list={
                selectOptions[
                  `${form.overview.projectCategory.toLowerCase()}ProjectType`
                ]?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [
                  { label: "Flat", value: "Flat" },
                  { label: "Shop", value: "Shop" },
                  { label: "Restaurant", value: "Restaurant" },
                  { label: "Pent house", value: "Pent house" },
                  { label: "Flat", value: "Flat" },
                  { label: "Land", value: "Land" },
                  { label: "Retail space", value: "Retail space" },
                  { label: "Studio apartment", value: "Studio apartment" },
                  { label: "Food court", value: "Food court" },
                ]
              }
              error={errors?.["overview.projectType"]}
              handleChange={(e, newValue) =>
                handleChange(newValue, "overview", "projectType")
              }
            />
            <NewInputFieldStructure
              isRequired={true}
              label="Phase"
              variant="outlined"
              isEdit={isEdit}
              error={errors?.["overview.phase"]}
              value={phase}
              handleChange={(e) => handleChange(e, "overview", "phase")}
            />
            <NewSelectTextFieldStructure
              isRequired={true}
              label="Launch"
              isEdit={isEdit}
              value={launchYear}
              list={
                selectOptions.launch?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || yearList
              }
              error={errors?.["overview.launchYear"]}
              handleChange={(e) => handleChange(e, "overview", "launchYear")}
            />
            <NewSelectTextFieldStructure
              isRequired={true}
              label="Completion"
              isEdit={isEdit}
              value={completionYear}
              list={
                selectOptions.completion?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || yearList
              }
              error={errors?.["overview.completionYear"]}
              handleChange={(e) =>
                handleChange(e, "overview", "completionYear")
              }
            />
            <NewSelectTextFieldStructure
              isRequired={true}
              label="Status"
              isEdit={isEdit}
              value={status}
              list={
                selectOptions.status?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                }) || [
                  {
                    label: "under construction",
                    value: "under construction",
                  },
                  { label: "completed", value: "completed" },
                  { label: "Pre launch", value: "Pre launch" },
                  { label: "RERA approved", value: "rera approved" },
                  { label: "Launch", value: "launch" },
                  { label: "CC", value: "cc" },
                  { label: "OC", value: "oc" },
                  { label: "Delivered", value: "delivered" },
                  { label: "Registeration", value: "registeration" },
                  { label: "Resale", value: "resale" },
                ]
              }
              error={errors?.["overview.status"]}
              handleChange={(e) => handleChange(e, "overview", "status")}
            />

            {status.toLowerCase() === "under construction" && (
              <NewSelectTextFieldStructure
                isRequired={true}
                label="Construction Progress"
                isEdit={isEdit}
                value={constructionProgress}
                list={[
                  { label: "Delay", value: "Delay" },
                  { label: "On time", value: "On time" },
                ]}
                error={errors?.["overview.constructionProgress"]}
                handleChange={(e) =>
                  handleChange(
                    e,
                    "overview",
                    "constructionProgress",
                    "builderScore",
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true
                  )
                }
              />
            )}
          </Grid>
        </Card>
      </Grid>
    </>
  );
}

export default ProjectCard;
