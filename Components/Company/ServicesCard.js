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
    
    const [checked, setChecked] = React.useState(false);

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
    };

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
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Commercial
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch checked={checked} onChange={handleSwitchChange}/>
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Sales
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch checked={checked} onChange={handleSwitchChange}/>
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Purchase
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch checked={checked} onChange={handleSwitchChange}/>
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Lease/Rent
                        </Typography>
                        
                    </Grid>
                    
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Residential
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch checked={checked} onChange={handleSwitchChange}/>
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Sales
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch checked={checked} onChange={handleSwitchChange}/>
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1 }}
                        >
                            Purchase
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
                        <Switch checked={checked} onChange={handleSwitchChange}/>
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