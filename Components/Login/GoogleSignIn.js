import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import GoogleIcon from "@mui/icons-material/Google";

const GoogleSignIn = ({getSignInUrl}) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Welcome to, <span style={{ color: "gray" }}>Acrebytes</span>
                </Typography>
                <Typography variant="body1">
                    Create account using Google
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    startIcon={<GoogleIcon />}
                    onClick={() => {
                        getSignInUrl()
                    }}
                >
                    Sign in with Google
                </Button>
            </Grid>
        </Grid>
    )
}

export default GoogleSignIn