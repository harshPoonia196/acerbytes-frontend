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
import NewMultiSelectAutoCompleteInputStructure from 'Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure';

function LandscapeCard({ isEdit }) {
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
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <NewInputFieldStructure
                        label="Tower"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Floor types"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Floors (Max-Min)"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewUnitAreaInputField
                        label="Area"
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
                        label="Unit density"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Green density"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Construction quality"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="Interior quality"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewMultiSelectAutoCompleteInputStructure label="Property type" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeCard