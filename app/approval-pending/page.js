'use client'

import {
    Card,
    Container,
    CardActionArea,
    Typography,
    Box,
} from "@mui/material";
import React from "react";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { listOfPages } from "Components/NavBar/Links";

function ApprovalPending() {

    const history = useRouter()

    return (
        <Container maxWidth="sm">
            <Card sx={{ p: 2, textAlign: "center" }}>
                <UnpublishedIcon fontSize="large" />
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 600 }}>
                    Your account is not yet approved by admin
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "10px"}}>We appreciate your patience. We are reviewing your details, please check after sometime. For any information AcreBytes team will contact you.</Typography>
            </Card>
            <Card sx={{ mt: 2, p: 2 }}>
                <Card>
                    <CardActionArea sx={{ p: 2, display: "flex", justifyContent: "start" }} onClick={() => { history.push(listOfPages.home) }}>
                        <HomeIcon />
                        <Typography variant="subtitle2" sx={{ ml: 1, alignSelf: "center", position: "relative", top: "2px" }}>
                            Go to Home
                        </Typography>
                    </CardActionArea>
                </Card>
            </Card>
        </Container>
    );
}

export default ApprovalPending