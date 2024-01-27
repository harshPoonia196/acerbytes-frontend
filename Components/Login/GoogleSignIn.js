import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingButton } from '@mui/lab';
import { companyName } from 'Components/NavBar/Links';
import colors from 'styles/theme/colors';

const GoogleSignIn = ({ getSignInUrl, googleSignInLoading }) => {
    return (
        <Grid container sx={{ p: 2 }} spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Sign in to, <span style={{ color: "gray" }}>{companyName}</span>
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                    for one step sign in, sign in using Google
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "end" }}>
                <LoadingButton
                    variant="contained"
                    sx={{ mt: 1 }}
                    loading={googleSignInLoading}
                    startIcon={<GoogleIcon />}
                    onClick={() => {
                        getSignInUrl()
                    }}
                >
                    Sign in with Google
                </LoadingButton>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body2' sx={{ mt: 1, fontStyle: 'italic' }}>
                    By signing in, you (user) agree with the acrebytes.com's <span className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }}>
                        terms
                    </span> and <span className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }}>
                        privacy
                    </span>
                </Typography>
            </Grid>
        </Grid >
    )
}

export default GoogleSignIn