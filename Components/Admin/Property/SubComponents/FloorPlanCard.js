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

function FloorPlanCard({ isEdit }) {
    return (
        <Grid item xs={12} id="floorplans">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Floor plans
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} columns={24} sx={{ p: 2 }}>
                    <NewSelectTextFieldStructure
                        label="Unit type"
                        isEdit={isEdit}
                    />
                    <NewUnitAreaInputField
                        label="Super area"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewUnitAreaInputField
                        label="Carpet area"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Name #"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <Grid item xs={24} sx={{ textAlign: 'end' }}>
                        <Button variant="contained">Add</Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default FloorPlanCard