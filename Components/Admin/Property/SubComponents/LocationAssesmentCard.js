import React, { useEffect } from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    ToggleButton,
    Rating,
    Switch,
    Divider,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure';
import colors from 'styles/theme/colors';
import { Assessment } from '@mui/icons-material';

function LocationAssesmentCard({ isEdit, form,handleChange }) {

    const { location } = form

    return (
        <Grid item xs={12} id="facilities">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Assesment
                    </Typography>
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    {
                        
                        Object?.keys(location)?.map(key => {
                         
                            return( 
                            key==='assesment'?<>
                                {
                                    Object.keys(location?.[key])?.map(insideKey => {
                                        return <>
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                                                <Switch onChange={(e)=>{handleChange(e,"location",key,"checked",undefined,insideKey)}} checked={location?.[key]?.[insideKey]?.isApplicable} />
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                                                >
                                                  
                                                    {insideKey}
                                                </Typography>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' onChange={(e)=>handleChange(e,"location",key,"checked",undefined,insideKey,undefined,true)} sx={{ alignSelf: 'center' }} />
                                            </Grid>
                                        </>
                                    })
                                }
                            </>
                            :<></>)
                         })
                     } 
                </Grid>
            </Card>
        </Grid>
    )
}

export default LocationAssesmentCard