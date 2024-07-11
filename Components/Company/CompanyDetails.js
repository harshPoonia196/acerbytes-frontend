import React from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    ToggleButton,
    Chip,
    Button,
    Divider,
    IconButton,
} from "@mui/material";


import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import {
    capitalLizeName,
    transformDocuments,
    yearList,
  } from "utills/CommonFunction";

const CompanyDetails = ({ isEdit, form, handleChange, errors, selectOptions, formState }) => {
  return (
    <Card sx={{mb: 2}} id="companyDetails">
        <Box sx={{ display: "flex", p: 2, py: 1 }}>
            <Typography
            variant="subtitle1"
            sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
            >
            Company Details
            </Typography>

            <Box sx={{ alignSelf: "center" }}>
            <Card
                sx={{
                width: "fit-content",
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
                {/* {form?.overview.sectionScore
                    ? form?.overview.sectionScore.toFixed()
                    : "00"} */}
                </Typography>
            </Card>
            </Box>
        </Box>
        <Divider />
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
            <NewAutoCompleteInputStructure
            isRequired={true}
            label="Company name"
            name="companyName"
            variant="outlined"
            isEdit={isEdit}
            value={formState.company.companyName}
            options={
                selectOptions?.company?.map((item) => {
                return {
                    label: item,
                    value: item,
                };
                }) || [{ label: "Birla", value: "Birla" }]
            }
            error={errors?.["company.companyName"]}
            handleChange={(e, newValue) => {
                handleChange(newValue.value, "company", "companyName");
            }}
            />
            <NewAutoCompleteInputStructure
            isRequired={true}
            label="Company type"
            name="companyName"
            variant="outlined"
            isEdit={isEdit}
            value={formState.company.companyName}
            options={
                selectOptions?.company?.map((item) => {
                return {
                    label: item,
                    value: item,
                };
                }) || [{ label: "Birla", value: "Birla" }]
            }
            error={errors?.["company.companyName"]}
            handleChange={(e, newValue) => {
                handleChange(newValue.value, "company", "companyName");
            }}
            />
            <NewInputFieldStructure
            isRequired={true}
            label="Email"
            variant="outlined"
            isEdit={isEdit}
            rows={2}
            
            error={errors?.["marketing.description"]}
            value=""
            handleChange={(e) => handleChange(e, "marketing", "description")}
        />
            <NewInputFieldStructure
            isRequired={true}
            label="Primary contact"
            variant="outlined"
            isEdit={isEdit}
            rows={2}
            error={errors?.["marketing.description"]}
            value=""
            handleChange={(e) => handleChange(e, "marketing", "description")}
        />
            <NewInputFieldStructure
            isRequired={true}
            label="Company details"
            variant="outlined"
            isEdit={isEdit}
            multiline
            rows={2}
            
            error={errors?.["marketing.description"]}
            value="{description}"
            handleChange={(e) => handleChange(e, "marketing", "description")}
        />
            <NewAutoCompleteInputStructure
            isRequired={true}
            label="Employees"
            name="employees"
            variant="outlined"
            isEdit={isEdit}
            value={formState.company.companyName}
            options={
                selectOptions?.company?.map((item) => {
                return {
                    label: item,
                    value: item,
                };
                }) || [{ label: "Birla", value: "Birla" }]
            }
            error={errors?.["company.employees"]}
            handleChange={(e, newValue) => {
                handleChange(newValue.value, "employees", "employees");
            }}
            />
            <NewSelectTextFieldStructure
            isRequired={true}
            label="Found year"
            isEdit={isEdit}
            value=""
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
            <NewAutoCompleteInputStructure
            isRequired={true}
            label="Tag Employees"
            name="tagEmployees"
            variant="outlined"
            isEdit={isEdit}
            value={formState.company.companyName}
            options={
                selectOptions?.company?.map((item) => {
                return {
                    label: item,
                    value: item,
                };
                }) || [{ label: "Birla", value: "Birla" }]
            }
            error={errors?.["company.companyName"]}
            handleChange={(e, newValue) => {
                handleChange(newValue.value, "company", "companyName");
            }}
            />
        </Grid>
    </Card>
  )
}

export default CompanyDetails