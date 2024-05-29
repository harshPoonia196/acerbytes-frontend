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


function LocationCard({ isEdit, form, handleChange, errors, selectOptions,moduleScoreCalc,cities,formUpdated }) {
    console.log(cities);
    const { openSnackbar } = useSnackbar()
    const { state, city, area, sector, pinCode, googleMapLink, longitude, latitude } = form.location
useEffect(()=>{

},[formUpdated])
    const getLocationsCall = async () => {
        try {
            let res = await getLocations()
            if (res.status === 200) {
                setOpts(res.data.data)
            }
            else {
                console.log('err')
            }
        }
        catch (err) {
            openSnackbar(
                "Error getting location  details",
                "error"
            );
        }


    }
    const [opts, setOpts] = React.useState([]);

    useEffect(() => {
        getLocationsCall();
    }, [])

    return (
       <>{  
        <Grid item xs={12} id="location" >
            <Card sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Location
                    </Typography>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <NewSelectTextFieldStructure
                        label="State"
                        isEdit={isEdit}
                        value={state}

                        list={
                            Object.keys(cities).map((item) => {
                                console.log(cities, "ddddddddddddddd");
                                return {
                                    label: item,
                                    value: item,
                                };
                            })
                            
                            ||
                            [{ label: "Kashmir", value: "Kashmir" }, { label: "Punjab", value: "Punjab" }, { label: "Tamil Nadu", value: "TamilNadu" }]}
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
                        disabled={state == undefined||state ==""}
                        error={errors?.["location.city"]}
                        options={
                            cities[state]?.map((item) => {
                                return {
                                    label: item,
                                    city: item,
                                };
                            })
                        }
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
                        type={"number"}
                        error={errors?.["location.pinCode"]}
                        handleChange={(e) => handleChange(e, "location", "pinCode")}
                    />
                    <NewInputFieldStructure
                        label="Google map link"
                        variant="outlined"
                        isEdit={isEdit}
                        value={googleMapLink}
                        error={errors?.["location.googleMapLink"]}
                        handleChange={(e) => handleChange(e, "location", "googleMapLink")}
                    />
                    <NewInputFieldStructure
                        label="Geo longitude"
                        variant="outlined"
                        isEdit={isEdit}
                        type={"number"}
                        value={longitude}
                        error={errors?.["location.longitude"]}
                        handleChange={(e) => handleChange(e, "location", "longitude")}
                    />
                    <NewInputFieldStructure
                        label="Geo latitude"
                        variant="outlined"
                        isEdit={isEdit}
                        type={"number"}
                        value={latitude}
                        error={errors?.["location.latitude"]}
                        handleChange={(e) => handleChange(e, "location", "latitude")}
                    />
                </Grid>
            </Card>

            <LocationAssesmentCard moduleScoreCalc={moduleScoreCalc} errors={errors} form={form} handleChange={handleChange} formUpdated={formUpdated} isEdit={isEdit} />
        </Grid>
                    }</>
    )
}

export default React.memo(LocationCard)