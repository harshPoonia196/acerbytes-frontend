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

function InvestmentCard({ isEdit, refCallback }) {
    return (
        <Grid item xs={12} id="investment" ref={refCallback}>
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Investment
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
                        label="Growth till now"
                        variant="outlined"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Expected further growth"
                        isEdit={isEdit}
                    />
                    <NewSelectTextFieldStructure
                        label="Investment scope"
                        isEdit={isEdit}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default InvestmentCard