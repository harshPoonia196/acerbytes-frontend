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
import NewUnitAreaInputField from 'Components/CommonLayouts/NewUnitAreaInputField';

function DocumentationCard({ isEdit }) {
    return (
        <Grid item xs={12} id="documentation">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Documentation
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} columns={12} sx={{ p: 2 }}>
                    <NewInputFieldStructure
                        label="RERA"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Registration"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="OC"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="CC"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Private bank loan available"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Government bank loan available"
                        isEdit={isEdit}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default DocumentationCard