import React from 'react';
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
                    <NewInputFieldStructure
                        label="Units (Total)"
                        name="totalUnits"
                        variant="outlined"
                        isEdit={isEdit}
                        error={errors?.["layout.totalUnits"]}
                        value={totalUnits}
                        handleChange={(e) => handleChange(e, "layout", "totalUnits")}
                    />
                    <NewUnitAreaInputField
                        label="Area"
                        name="area"
                        variant="outlined"
                        isEdit={isEdit}
                        value={area}
                        error={errors?.["layout.area"]}
                        handleChange={(e) => handleChange(e, "layout", "area")}
                        units={[
                            { label: 'acres', value: 'acres' }
                        ]}
                    />
                    <NewUnitAreaInputField
                        label="Green area"
                        name="greenArea"
                        variant="outlined"
                        isEdit={isEdit}
                        value={greenArea}
                        error={errors?.["layout.greenArea"]}
                        handleChange={(e) => handleChange(e, "layout", "greenArea")}
                    />
                    <NewInputFieldStructure
                        label="Unit density"
                        name="unitDensity"
                        variant="outlined"
                        isEdit={isEdit}
                        value={unitDensity}
                        error={errors?.["layout.unitDensity"]}
                        handleChange={(e) => handleChange(e, "layout", "unitDensity")}
                    />
                    <NewInputFieldStructure
                        label="Green density"
                        name="greenDensity"
                        variant="outlined"
                        isEdit={isEdit}
                        value={greenDensity}
                        error={errors?.["layout.greenDensity"]}
                        handleChange={(e) => handleChange(e, "layout", "greenDensity")}
                    />

                    <Grid item xs={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Construction Quality
                            </Typography>
                        </Box>
                        <Rating name="construction-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
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
                        <Rating name="interior-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeCard;
