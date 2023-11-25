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
import DateTimeInputField from '../../../CommonLayouts/DateTimeInputField';

function BuilderPriceCard({ isEdit }) {
    return (
        <Grid item xs={12} id="builderPrice">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Builder price
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} columns={12} sx={{ p: 2 }}>
                    <NewUnitAreaInputField
                        label="Rate"
                        variant="outlined"
                        isEdit={isEdit}
                        isPrice
                    />
                    <DateTimeInputField label="When" variant='outlined' isEdit={isEdit} />
                    <Grid item xs={18} sx={{ textAlign: 'end' }}>
                        <Button variant='contained'>Add</Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default BuilderPriceCard