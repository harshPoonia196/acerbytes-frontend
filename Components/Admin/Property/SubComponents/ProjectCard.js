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
        <Grid item xs={12} id="project">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Project
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
                </Grid>
            </Card>
        </Grid>
    )
}

export default ProjectCard