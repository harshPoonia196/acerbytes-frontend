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
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationAssesmentCard from "Components/Admin/Property/SubComponents/LocationAssesmentCard"
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewAutocompleteAddOptionToList from "Components/CommonLayouts/NewAutocompleteAddOptionToList"
import { getLocations } from 'api/Property.api';
import { useSnackbar } from "utills/SnackbarContext";


function LocationCard({ isEdit, form, handleChange, errors,selectOptions }) {
    const { openSnackbar } = useSnackbar()
    const { state, city, area, sector, pinCode, googleMapLink, longitude, latitude } = form.location

const getLocationsCall = async()=>{
    try{
        let res = await getLocations()
        if(res.status===200){
            setOpts(res.data.data)
        }
        else{
            console.log('err')
        }
    }
    catch(err){
        openSnackbar(
              "Error getting location  details",
            "error"
          );    }


}
const [opts, setOpts] = React.useState([]);

useEffect(()=>{
getLocationsCall();
},[])

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
                       
                        list={[ {label:"Kashmir",value:"Kashmir"}, {label:"Punjab",value:"Punjab"},{label:"Tamil Nadu",value:"TamilNadu"}]}
                        error={errors?.["location.state"]}
                        handleChange={(e) => handleChange(e, "location", "state")}
                    />
                    {/* <NewInputFieldStructure
                        label="City"
                        variant="outlined"
                        isEdit={isEdit}
                        value={city}
                        error={errors?.["location.city"]}
                        handleChange={(e) => handleChange(e, "location", "city")}
                    /> */}
                    <NewAutocompleteAddOptionToList
                    label="City"
                    value={city}
                    error={errors?.["location.city"]}
                    options={opts}
                    handleChange={(e) => handleChange(e, "location", "city")}
                    />
                  
                    <NewInputFieldStructure
                        label="Area"
                        variant="outlined"
                        isEdit={isEdit}
                        value={area}
                        error={errors?.["location.area"]}
                        handleChange={(e) => handleChange(e, "location", "area")}
                    />
                      <NewInputFieldStructure
                        label="Sector / Locality / Sub area"
                        variant="outlined"
                        isEdit={isEdit}
                        value={sector}
                        error={errors?.["location.sector"]}
                        handleChange={(e) => handleChange(e, "location", "sector")}
                    />
                    <NewInputFieldStructure
                        label="Pincode"
                        variant="outlined"
                        isEdit={isEdit}
                        value={pinCode}
                        error={errors?.["location.pinCode"]}
                        handleChange={(e)=> handleChange(e, "location", "pinCode")}
                    />
                    <NewInputFieldStructure
                        label="Google map link"
                        variant="outlined"
                        isEdit={isEdit}
                        value={googleMapLink}
                        error={errors?.["location.googleMapLink"]}
                        handleChange={(e)=> handleChange(e, "location", "googleMapLink")}
                    />
                    <NewInputFieldStructure
                        label="Geo longitude"
                        variant="outlined"
                        isEdit={isEdit}
                        value={longitude}
                        error={errors?.["location.longitude"]}
                        handleChange={(e)=> handleChange(e, "location", "longitude")}
                    />
                    <NewInputFieldStructure
                        label="Geo latitude"
                        variant="outlined"
                        isEdit={isEdit}
                        value={latitude}
                        error={errors?.["location.latitude"]}
                        handleChange={(e)=> handleChange(e, "location", "latitude")}
                    />
                    <Box>

<LocationAssesmentCard errors={errors} form={form} handleChange={handleChange} isEdit={isEdit} />
</Box>
                </Grid>
            </Card>
        </Grid>
    )
}

export default React.memo(LocationCard)