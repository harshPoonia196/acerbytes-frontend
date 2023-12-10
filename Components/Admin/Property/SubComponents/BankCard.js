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

function BankCard({ isEdit, refCallback }) {

    const [sbiLoanToggle, setSbiLoanToggle] = useState('')

    const handleChangeSbiLoanToggle = (event, newAlignment) => {
        if (newAlignment != null)
            setSbiLoanToggle(newAlignment);
    }

    return (
        <Grid item xs={12} id="bank" ref={refCallback}>
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Bank
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch defaultChecked />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            SBI
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch defaultChecked />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            HDFC
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch defaultChecked />

                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            PNB housing
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch defaultChecked />

                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            ICICI
                        </Typography>

                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch defaultChecked />

                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            LIC approved
                        </Typography>

                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default BankCard