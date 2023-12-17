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

function RegulatoryCard({ isEdit }) {
    return (
        <Grid item xs={12} id="regulatory">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Regulatory clearance
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
                        label="RERA approved"
                        isEdit={isEdit}
                    />
                    <NewInputFieldStructure
                        label="RERA number"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="CC"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="OC"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Authority registration"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Government Loan"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Private Bank loan"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Resale"
                        isEdit={isEdit}
                    />
                    <Grid item sx={{ display: 'flex', ml: 'auto' }}>
                        <Box sx={{ alignSelf: 'end', flex: 1, }}>
                            <Button variant='contained' >Add</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default RegulatoryCard