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
import NewInputFieldStructure from 'Components/CommonLayouts/NewInputFieldStructure';

function OverallAssessmentCard({ isEdit }) {
    return (
        <Grid item xs={12} id="overallAssessment">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Overall Assessment
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            width: "fit-content",
                            margin: "auto",
                        }}
                    >
                        <Typography variant="h1">99</Typography>
                        <Typography variant="h5" sx={{ alignSelf: "end" }}>
                            /100
                        </Typography>
                    </Box>
                </Grid>
            </Card>
        </Grid >
    )
}

export default React.memo(OverallAssessmentCard)