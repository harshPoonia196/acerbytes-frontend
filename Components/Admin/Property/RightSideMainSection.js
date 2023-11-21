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
import LocationCard from './SubComponents/LocationCard';
import ProjectCard from './SubComponents/ProjectCard';
import BankCard from './SubComponents/BankCard';
import FacilitiesCard from './SubComponents/FacilitiesCard';
import LandscapeCard from './SubComponents/LandscapeCard';
import FloorPlanCard from './SubComponents/FloorPlanCard';
import RegulatoryCard from './SubComponents/RegulatoryCard';
import ConstructionCard from './SubComponents/ConstructionCard';
import BuilderPriceCard from './SubComponents/BuilderPriceCard';
import ResalePriceCard from './SubComponents/ResalePriceCard';
import InvestmentCard from './SubComponents/InvestmentCard';
import MarketingCard from './SubComponents/MarketingCard';

function RightSideMainSection() {
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
            <ProjectCard isEdit={isEdit} />
            <LocationCard isEdit={isEdit} />
            <LandscapeCard isEdit={isEdit} />
            <FloorPlanCard isEdit={isEdit} />
            <RegulatoryCard isEdit={isEdit} />
            <ConstructionCard isEdit={isEdit} />
            <BuilderPriceCard isEdit={isEdit} />
            <ResalePriceCard isEdit={isEdit} />
            <InvestmentCard isEdit={isEdit} />
            <BankCard isEdit={isEdit} />
            <FacilitiesCard isEdit={isEdit} />
            <MarketingCard isEdit={isEdit} />
        </>
    )
}

export default RightSideMainSection