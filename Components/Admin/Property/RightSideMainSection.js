import React, { useState } from 'react'
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
import CallIcon from "@mui/icons-material/Call";
import PropertyTable from "Components/ProfilePage/PropertyTable";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewPhoneInputFieldStructure from "Components/CommonLayouts/NewPhoneInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewCurrencyInputField from "Components/CommonLayouts/NewCurrencyInputField";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";


function RightSideMainSection({ refCallback }) {
    const [isEdit, setIsEdit] = useState(true);

    return (
        <>
            <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                Property name
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Mumbai
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'end' }}>
                            <Typography variant="h6" sx={{ alignSelf: "center" }}>
                                Active
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                Publish 2 days ago
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Grid>
            <ProjectCard isEdit={isEdit} refCallback={refCallback} />
            <LocationCard isEdit={isEdit} refCallback={refCallback} />
            <LandscapeCard isEdit={isEdit} refCallback={refCallback} />
            <FloorPlanCard isEdit={isEdit} refCallback={refCallback} />
            <RegulatoryCard isEdit={isEdit} refCallback={refCallback} />
            <ConstructionCard isEdit={isEdit} refCallback={refCallback} />
            <BuilderPriceCard isEdit={isEdit} refCallback={refCallback} />
            <ResalePriceCard isEdit={isEdit} refCallback={refCallback} />
            <InvestmentCard isEdit={isEdit} refCallback={refCallback} />
            <BankCard isEdit={isEdit} refCallback={refCallback} />
            <FacilitiesCard isEdit={isEdit} refCallback={refCallback} />
            <MarketingCard isEdit={isEdit} refCallback={refCallback} />
        </>
    )
}

export default RightSideMainSection