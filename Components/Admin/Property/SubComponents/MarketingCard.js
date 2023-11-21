import React from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    ToggleButton,
    Chip,
    Switch,
    Divider,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure';
import { useState } from 'react';
import colors from 'styles/theme/colors';

function MarketingCard({ isEdit }) {

    return (
        <Grid item xs={12} id="marketing">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Marketing
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12}>
                        <Card>

                        </Card>
                        <input type='file' />
                    </Grid>
                    <NewInputFieldStructure label='Tag line' variant='outlined' isEdit={isEdit} isFull />
                    <NewInputFieldStructure label='Tag line' variant='outlined' isEdit={isEdit} multiline rows={2} isFull />
                </Grid>
            </Card>
        </Grid>
    )
}

export default MarketingCard