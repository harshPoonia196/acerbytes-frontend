import React, { useEffect } from 'react';
import {
    Card,
    Typography,
    Grid,
    Box,
    IconButton,
    Divider,
    Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewUnitAreaInputField from '../../../CommonLayouts/NewUnitAreaInputField';
import colors from 'styles/theme/colors';
import NewMultiSelectAutoCompleteInputStructure from 'Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure';

function LandscapeCard({ isEdit, form, handleChange, errors }) {

    const { numberOfBuildings, maxFloors, minFloors, totalUnits, area, greenArea, unitDensity, greenDensity, layoutType } = form.layout;

    return (
        <Grid item xs={12} id="landscape">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Layout
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
                        label="No of buildings"
                        name="numberOfBuildings"
                        variant="outlined"
                        isEdit={isEdit}
                        value={numberOfBuildings}
                        error={errors?.["layout.numberOfBuildings"]}
                        handleChange={(e) => handleChange(e, "layout", "numberOfBuildings")}
                    />
                    <NewMultiSelectAutoCompleteInputStructure
                        label="Layout type"
                        isEdit={isEdit}
                        name="layoutType"
                        value={layoutType}
                        list={[
                            { label: '1 BHK', value: '1 BHK' },
                            { label: '2 BHK', value: '2 BHK' },
                            { label: '3 BHK', value: '3 BHK' },
                            { label: '4 BHK', value: '4 BHK' },
                            { label: '5 BHK', value: '5 BHK' },
                            { label: '6 BHK', value: '6 BHK' },
                            { label: '7 BHK', value: '7 BHK' },
                            { label: '8 BHK', value: '8 BHK' },
                            { label: '9+ BHK', value: '9+ BHK' },
                        ]}
                        error={errors?.["layout.layoutType"]}
                        handleChange={(e, newValue) => handleChange(newValue, "layout", "layoutType")}
                    />
                    <NewInputFieldStructure
                        label="Floors (Max)"
                        name="maxFloors"
                        variant="outlined"
                        isEdit={isEdit}
                        value={maxFloors}
                        error={errors?.["layout.maxFloors"]}
                        handleChange={(e) => handleChange(e, "layout", "maxFloors")}
                    />
                    <NewInputFieldStructure
                        label="Floors (Min)"
                        name="minFloors"
                        variant="outlined"
                        isEdit={isEdit}
                        value={minFloors}
                        error={errors?.["layout.minFloors"]}
                        handleChange={(e) => handleChange(e, "layout", "minFloors")}
                    />

                    <NewUnitAreaInputField
                        label="Area"
                        name="area"
                        variant="outlined"
                        isEdit={isEdit}
                        value={area}
                        error={errors?.["layout.area"]}
                        handleChange={(e) => { handleChange(e, "layout", "area") }}
                        units={[
                            { label: 'acres', value: 'acres' }
                        ]}
                    />
                    <NewInputFieldStructure
                        label="Units (Total)"
                        name="totalUnits"
                        variant="outlined"
                        isEdit={isEdit}
                        error={errors?.["layout.totalUnits"]}
                        value={totalUnits}
                        handleChange={(e) => handleChange(e, "layout", "totalUnits", undefined, true, "unitDensity", e.target.value / area)}
                    />
                    <NewUnitAreaInputField
                        label="Green area"
                        name="greenArea"
                        variant="outlined"
                        isEdit={isEdit}
                        value={greenArea}
                        error={errors?.["layout.greenArea"]}
                        handleChange={(e) => handleChange(e, "layout", "greenArea", undefined, true, "greenDensity", area ? e.target.value / area : e.target.value / 1)}
                    />
                    <Grid item xs={0} sm={6}></Grid>
                    <NewInputFieldStructure
                        label="Unit density"
                        name="unitDensity"
                        variant="outlined"
                        isEdit={isEdit}
                        value={unitDensity}
                        error={errors?.["layout.unitDensity"]}
                        handleChange={(e) => handleChange(e, "layout", "unitDensity")}
                    />
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Score
                            </Typography>
                        </Box>
                        <Rating defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>
                    <NewInputFieldStructure
                        label="Green density"
                        name="greenDensity"
                        variant="outlined"
                        isEdit={isEdit}
                        value={greenDensity}
                        error={errors?.["layout.greenDensity"]}
                        handleChange={(e) => handleChange(e, "layout", "greenDensity")}
                    />
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Score
                            </Typography>
                        </Box>
                        <Rating defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Construction Quality
                            </Typography>
                        </Box>
                        <Rating onChange={(e) => { handleChange(e, "layout", "constructionQuality") }} name="construction-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Interior Quality
                            </Typography>
                        </Box>
                        <Rating onChange={(e) => { handleChange(e, "layout", "interiorQuality") }} name="interior-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeCard;
