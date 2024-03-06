import React,{useState,useEffect} from 'react'
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
import {
    transformDocuments
} from "utills/CommonFunction";
import { getAllOptions } from "api/Property.api";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure';
import colors from 'styles/theme/colors';
import { useSnackbar } from "utills/SnackbarContext";

function FacilitiesCard({ isEdit, form, handleChange, handleRating }) {


    const [selectOptions, setSelectOption] = useState({})
    const [loading, setLoading] = useState(false);

    const { openSnackbar } = useSnackbar();

    const showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    };


    const getAllOptionDataList = async () => {
        try {
            let res = await getAllOptions();
            if (res.status === 200) {
                let transform = transformDocuments(res.data.data)
                const temp = transform.amenities.reduce((acc, item) => {
                    acc[item] = {};
                    return acc;
                  }, {});

                  transform.amenities.map((item)=>{
                    transform[item.toLowerCase()].map((thing) => {
                        temp[item][thing] = {
                            isApplicable: false,
                            rating: 0
                        }
    
                    })
                  })                                 
                setSelectOption({ ...temp })
            }
        } catch (error) {
            showToaterMessages(
              error?.response?.data?.message ||
              error?.message ||
              "Error fetching state list",
              "error"
            );
        }
        finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        getAllOptionDataList()

    }, [])


    const { amenitiesData } = form
    return (
        <Grid item xs={12} id="facilities">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Amenities
                    </Typography>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    {
                        Object?.keys(selectOptions)?.map(key => {
                            return <>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{key}</Typography>
                                </Grid>

                                {
                                    Object.keys(selectOptions?.[key])?.map(insideKey => {
                                        return <>
                                            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                                                <Switch onChange={(e) => { handleChange(e, "amenitiesData", key, "checked", undefined, insideKey) }} checked={amenitiesData?.[key]?.[insideKey]?.isApplicable} />
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                                                >
                                                    {insideKey}
                                                </Typography>
                                                <Rating value={amenitiesData?.[key]?.[insideKey]?.rating} name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} onChange={(e) => handleChange(e, "amenitiesData", key, "checked", undefined, insideKey, undefined, true)} />
                                            </Grid>
                                        </>
                                    })
                                }
                            </>
                        })
                    }
                </Grid>
            </Card>
        </Grid>
    )
}

export default React.memo(FacilitiesCard)