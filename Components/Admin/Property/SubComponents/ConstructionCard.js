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

function ConstructionCard({ isEdit }) {
    return (
        <Grid item xs={12} id="construction" >
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Construction
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <NewSelectTextFieldStructure
                        label="Status"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Expected Delivery"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Construction speed"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Structure"
                        isEdit={isEdit}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default ConstructionCard