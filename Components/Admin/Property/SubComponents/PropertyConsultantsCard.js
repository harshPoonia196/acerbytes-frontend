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
import NewMultiSelectAutoCompleteInputStructure from 'Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure';
import BrokerCard from 'Components/BrokersPage/BrokerCard';

function PropertyConsultantsCard({ isEdit , form , handleChange }) {
    let {consultants} = form
    return (
        <Grid item xs={12} id="propertyConsultants">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Property Consultants
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <NewMultiSelectAutoCompleteInputStructure  value={form.consultants}
                        list={[
                            { label: "Anand Gupta", value: "Consultant"},
                            { label: "Anand Mehta", value: "Consultant" },
                            { label: "Annadhurai", value: "Consultant" },
                        ]} isEdit={isEdit} />
                    <Grid item xs={12}>
                        <BrokerCard broker={{ name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 }} noReview />
                    </Grid>
                </Grid>
            </Card>
        </Grid >
    )
}

export default PropertyConsultantsCard