import React from 'react'
import {
    Card,
    Typography,
    Grid,
    Box,
    ToggleButton,
    Chip,
    Switch,
    Divider,
    IconButton,
    Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure';
import { useState } from 'react';
import colors from 'styles/theme/colors';
import AttachFileIcon from '@mui/icons-material/AttachFile'
import UploadMarketingImage from 'Components/Admin/Property/Modal/UploadMarketingImage'


function MarketingCard({ isEdit, refCallback }) {

    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false)

    const handleOpenUploadPopup = () => {
        setIsUploadPopupOpen(true)
    }

    const handleCloseUploadPopup = () => {
        setIsUploadPopupOpen(false)
    }

    const [image, setImage] = useState('')
    const [cropData, setCropData] = useState()
    const [cropper, setCropper] = useState()
    const [enableCropper, setEnableCropper] = useState(false)

    const handleImageSelect = (e) => {
        e.preventDefault()
        let files
        if (e.dataTransfer) {
            files = e.dataTransfer.files
        } else if (e.target) {
            files = e.target.files
        }
        const reader = new FileReader()
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(files[0])
        handleOpenUploadPopup()
    }

    const handleImageRemove = () => {
        setImage('')
        handleCloseUploadPopup()
    }

    return (
        <Grid item xs={12} id="marketing" ref={refCallback}>
            <UploadMarketingImage open={isUploadPopupOpen} image={image} setImage={setImage} onClose={handleCloseUploadPopup} changeImage={handleImageSelect} removeImage={handleImageRemove} />
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Marketing
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
                        <Card sx={{ display: 'flex', p: 2 }}>
                            <Typography sx={{ flex: 1, alignSelf: 'center' }}>Upload</Typography>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ textTransform: 'uppercase' }}
                                startIcon={<AttachFileIcon />}
                            >
                                Attach
                                <input
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleImageSelect}
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                />
                            </Button>
                        </Card>
                    </Grid>
                    <NewInputFieldStructure label='Tag line' variant='outlined' isEdit={isEdit} isFull />
                    <NewInputFieldStructure label='Tag line' variant='outlined' isEdit={isEdit} multiline rows={2} isFull />
                </Grid>
            </Card>
        </Grid>
    )
}

export default MarketingCard