import React, { useEffect } from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    ToggleButton,
    Chip,
    Button,
    Divider,
    Switch,
    IconButton,
} from "@mui/material";

import { useSnackbar } from "utills/SnackbarContext";


function ServicesCard({ isEdit, form, handleChange, errors,formUpdated }) {
    const { openSnackbar } = useSnackbar()
    


    return (
       <>{  
        <Grid item xs={12} id="services" >
            <Card sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Services
                    </Typography>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch onChange={(e) => { handleChange(e, "amenitiesData", key, "checked", undefined, insideKey) }} checked="false" />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Commercial
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch onChange={(e) => { handleChange(e, "amenitiesData", key, "checked", undefined, insideKey) }} checked="false" />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Sale
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch onChange={(e) => { handleChange(e, "amenitiesData", key, "checked", undefined, insideKey) }} checked="false" />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Purchase
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch onChange={(e) => { handleChange(e, "amenitiesData", key, "checked", undefined, insideKey) }} checked="false" />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Lease/Rent
                        </Typography>
                        
                    </Grid>
                    
                </Grid>
            </Card>
        </Grid>
                    }</>
    )
}

export default React.memo(ServicesCard)