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
import NewUnitAreaInputField from '../../../CommonLayouts/NewUnitAreaInputField';

function LandscapeCard({ isEdit }) {
    return (
        <Grid item xs={12} id="landscape">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Landscape
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
                        label="Towers"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Total Units"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewUnitAreaInputField
                        label="Total area"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewUnitAreaInputField
                        label="Open area"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewUnitAreaInputField
                        label="Green area"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Density"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeCard