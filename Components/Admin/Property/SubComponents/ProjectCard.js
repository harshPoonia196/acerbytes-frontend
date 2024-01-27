import React from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    Divider,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewAutoCompleteInputStructure from 'Components/CommonLayouts/NewAutoCompleteInputStructure';
import NewMultiSelectAutoCompleteInputStructure from 'Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure';

function ProjectCard({ isEdit, form, handleChange, errors }) {

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


    return (
        <>
            <Grid item xs={12} id="project">
                <Card sx={{ p: 2 }}>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                Property name
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Mumbai
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'end' }}>
                            <Typography variant="h6" sx={{ alignSelf: "center" }}>
                                Active
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Publish 2 days ago
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Box sx={{ display: "flex", p: 2, py: 1 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                        >
                            Overview
                        </Typography>
                        <Box>
                            <IconButton>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider />
                    <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                        <NewAutoCompleteInputStructure
                            label="Builder"
                            name="builder"
                            variant="outlined"
                            isEdit={isEdit}
                            value={builder}
                            options={[
                                { label: "Birla", value: "Birla" }
                            ]}
                            error={errors?.["overview.builder"]}
                            handleChange={(e, newValue) => handleChange(newValue?.value, "overview", "builder")}
                        />
                        <NewInputFieldStructure
                            label="Project name"
                            variant="outlined"
                            isEdit={isEdit}
                            value={projectName}
                            error={errors?.["overview.projectName"]}
                            handleChange={(e) => handleChange(e, "overview", "projectName")}
                        />
                        <NewSelectTextFieldStructure
                            label="Project category"
                            name="projectCategory"
                            isEdit={isEdit}
                            value={projectCategory}
                            error={errors?.["overview.projectCategory"]}
                            list={[
                                { label: 'Residential', value: 'Residential' },
                                { label: 'Commercial', value: 'Commercial' },
                            ]}
                            handleChange={(e) => handleChange(e, "overview", "projectCategory")}
                        />
                        <NewMultiSelectAutoCompleteInputStructure
                            label="Project type"
                            isEdit={isEdit}
                            value={projectType}
                            list={[
                                { label: 'Flat', value: 'Flat' },
                                { label: 'Shop', value: 'Shop' },
                            ]}
                            error={errors?.["overview.projectType"]}
                            handleChange={(e, newValue) => handleChange(newValue, "overview", "projectType")}
                        />
                        <NewInputFieldStructure
                            label="Phase"
                            variant="outlined"
                            isEdit={isEdit}
                            error={errors?.["overview.phase"]}
                            value={phase}
                            handleChange={(e) => handleChange(e, "overview", "phase")}
                        />
                        <NewSelectTextFieldStructure
                            label="Launch"
                            isEdit={isEdit}
                            value={launchYear}
                            list={[
                                { label: '2000', value: '2000' },
                                { label: '2001', value: '2001' },
                            ]}
                            error={errors?.["overview.launchYear"]}
                            handleChange={(e) => handleChange(e, "overview", "launchYear")}
                        />
                        <NewSelectTextFieldStructure
                            label="Completion"
                            isEdit={isEdit}
                            value={completionYear}
                            list={[
                                { label: '2000', value: '2000' },
                                { label: '2001', value: '2001' },
                            ]}
                            handleChange={(e) => handleChange(e, "overview", "completionYear")}
                        />
                        <NewSelectTextFieldStructure
                            label="Status"
                            isEdit={isEdit}
                            value={status}
                            list={[
                                { label: 'under construction', value: 'under construction' },
                                { label: 'completed', value: 'completed' },
                            ]}
                            error={errors?.["overview.status"]}
                            handleChange={(e) => handleChange(e, "overview", "status")}
                        />

                        {
                            status === "under construction" &&
                            <NewSelectTextFieldStructure
                                label="Construction Progress"
                                isEdit={isEdit}
                                value={constructionProgress}
                                list={[
                                    { label: 'Delay', value: 'Delay' },
                                    { label: 'On time', value: 'On time' },
                                ]}
                                error={errors?.["overview.constructionProgress"]}
                                handleChange={(e) => handleChange(e, "overview", "constructionProgress")}
                            />
                        }

                    </Grid>
                </Card>
            </Grid>
        </>
    )
}

export default ProjectCard