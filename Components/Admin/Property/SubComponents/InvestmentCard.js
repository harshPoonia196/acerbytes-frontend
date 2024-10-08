import React from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    Divider,
    IconButton,
    Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import colors from 'styles/theme/colors';

function InvestmentCard({ isEdit, form, handleChange, moduleScoreCalc, scoreChange }) {

    const { forEndUse, expectedFurtherApp, appTillNow } = form.valueForMoney

    return (
        <Grid item xs={12} id="investment">
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Value for money
                    </Typography>

                    <Box sx={{ alignSelf: "center" }}>
                        <Card
                            sx={{
                                width: "fit-content",
                                backgroundColor: colors?.BLACK,
                                borderRadius: "4px !important",
                                m: 0,
                                ml: "auto !important",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    width: "fit-content",
                                    color: "white",
                                    p: 0.5,
                                    px: 1,
                                    cursor: "pointer",
                                }}
                            >
                                {form?.valueForMoney.sectionScore
                                    ? form?.valueForMoney.sectionScore.toFixed()
                                    : "00"}
                            </Typography>
                        </Card>
                    </Box>


                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Appreciation till now
                            </Typography>
                        </Box>
                        <Rating value={appTillNow} onChange={(e) =>
                            scoreChange(e, "valueForMoney", "appTillNow")
                        } name="construction-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                Expected further appreciation
                            </Typography>
                        </Box>
                        <Rating value={expectedFurtherApp} onChange={(e) =>
                            scoreChange(e, "valueForMoney", "expectedFurtherApp")
                        } name="construction-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
                            >
                                For end use
                            </Typography>
                        </Box>
                        <Rating value={forEndUse} onChange={(e) => {
                            scoreChange(e, "valueForMoney", "forEndUse")
                        }
                        } name="construction-quality" defaultValue={0} precision={0.5} size='small' sx={{ alignSelf: 'center', mt: 1 }} />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default React.memo(InvestmentCard)