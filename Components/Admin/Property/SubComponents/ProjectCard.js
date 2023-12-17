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
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";

function ProjectCard({ isEdit }) {
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
                        <NewInputFieldStructure
                            label="Builder"
                            variant="outlined"
                            isEdit={isEdit}
                        />
                        <NewInputFieldStructure
                            label="Project name"
                            variant="outlined"
                            isEdit={isEdit}
                        />
                        <NewSelectTextFieldStructure
                            label="Project type"
                            isEdit={isEdit}
                        />
                        <NewSelectTextFieldStructure
                            label="Project category"
                            isEdit={isEdit}
                        />
                        <NewInputFieldStructure
                            label="Phase"
                            variant="outlined"
                            isEdit={isEdit}
                        />
                        <NewSelectTextFieldStructure
                            label="Launch"
                            isEdit={isEdit}
                        />
                        <NewSelectTextFieldStructure
                            label="Completion"
                            isEdit={isEdit}
                        />
                        <NewInputFieldStructure
                            label="Location"
                            variant="outlined"
                            isEdit={isEdit}
                        />
                        <NewSelectTextFieldStructure
                            label="Stage"
                            isEdit={isEdit}
                        />
                        <NewSelectTextFieldStructure
                            label="Speed"
                            isEdit={isEdit}
                        />
                    </Grid>
                </Card>
            </Grid>
        </>
    )
}

export default ProjectCard