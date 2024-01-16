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

function LocationCard({ isEdit, form, handleChange }) {

    const { state, city, area, sector, pinCode, googleMapLink, longitude, latitude } = form.location

    return (
        <Grid item xs={12} id="location" >
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Location
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
                        label="State"
                        isEdit={isEdit}
                        value={state}
                        handleChange={(e) => handleChange(e, "location", "state")}
                    />
                    <NewInputFieldStructure
                        label="City"
                        variant="outlined"
                        isEdit={isEdit}
                        value={city}
                        handleChange={(e) => handleChange(e, "location", "city")}
                    />
                    <NewInputFieldStructure
                        label="Sector"
                        variant="outlined"
                        isEdit={isEdit}
                        value={sector}
                        handleChange={(e) => handleChange(e, "location", "sector")}
                    />
                    <NewInputFieldStructure
                        label="Area"
                        variant="outlined"
                        isEdit={isEdit}
                        value={area}
                        handleChange={(e) => handleChange(e, "location", "area")}
                    />
                    <NewInputFieldStructure
                        label="Pincode"
                        variant="outlined"
                        isEdit={isEdit}
                        value={pinCode}
                        handleChange={(e)=> handleChange(e, "location", "pinCode")}
                    />
                    <NewInputFieldStructure
                        label="Google map link"
                        variant="outlined"
                        isEdit={isEdit}
                        value={googleMapLink}
                        handleChange={(e)=> handleChange(e, "location", "googleMapLink")}
                    />
                    <NewInputFieldStructure
                        label="Geo longitude"
                        variant="outlined"
                        isEdit={isEdit}
                        value={longitude}
                        handleChange={(e)=> handleChange(e, "location", "longitude")}
                    />
                    <NewInputFieldStructure
                        label="Geo latitude"
                        variant="outlined"
                        isEdit={isEdit}
                        value={latitude}
                        handleChange={(e)=> handleChange(e, "location", "latitude")}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LocationCard