import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import GoogleIcon from "@mui/icons-material/Google";
import { LoadingButton } from '@mui/lab';

const GoogleSignIn = ({getSignInUrl, googleSignInLoading}) => {
    return (
        <Grid container sx={{ p: 2 }}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Welcome to, <span style={{ color: "gray" }}>Acrebytes</span>
                </Typography>
                <Typography variant="body1" sx={{mt: 0.5}}>
                    Create account using Google
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
        </Grid>
    )
}

export default GoogleSignIn