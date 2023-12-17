import React from 'react'
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

function FacilitiesCard({ isEdit }) {
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
                    <Box>
                        <IconButton>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Basic</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Gym
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Pool
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Expected</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Gym
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Pool
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Basic</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Gym
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Pool
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Basic</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Gym
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                        <Switch />
                        <Typography
                            variant="subtitle2"
                            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                        >
                            Pool
                        </Typography>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center' }} />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default FacilitiesCard