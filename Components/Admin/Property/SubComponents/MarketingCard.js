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
import { useSnackbar } from "utills/SnackbarContext";

import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure';
import { useState } from 'react';
import colors from 'styles/theme/colors';
import AttachFileIcon from '@mui/icons-material/AttachFile'
import UploadMarketingImage from 'Components/Admin/Property/Modal/UploadMarketingImage'
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';


function MarketingCard({ isEdit, errors, form, handleChange }) {

    const { tagLine, description } = form.marketing

    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false)

    const handleOpenUploadPopup = () => {
        setIsUploadPopupOpen(true)
    }

    const handleCloseUploadPopup = () => {
        setIsUploadPopupOpen(false)
    }

    const [image, setImage] = useState('')
    const [cropData, setCropData] = useState('')
    const [cropper, setCropper] = useState(false)
    const [enableCropper, setEnableCropper] = useState(false)

    const handleImageSelect = (e) => {
        console.log('hereimage')
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
            console.log(reader.result,'ree')
        }
        reader.readAsDataURL(files[0])
        console.log(files[0],'filess')
        handleOpenUploadPopup()

    }

    const handleImageRemove = () => {
        setImage('')
        handleCloseUploadPopup()
    }

    return (
        <Grid item xs={12} id="marketing">
            <UploadMarketingImage open={isUploadPopupOpen} image={image} setImage={setImage} onClose={handleCloseUploadPopup} handleClose={handleCloseUploadPopup} changeImage={handleImageSelect} handleChange={handleChange} removeImage={handleImageRemove} />
            <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                    >
                        Marketing
                    </Typography>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12}>
                        <Card sx={{ display: 'flex', p: 2 }}>
                            <Typography sx={{ flex: 1, alignSelf: 'center' }}>Upload</Typography>
                            {/* <CustomButton
                                variant="contained"
                                component="label"
                                // onClick={handleImageSelect}
                                sx={{ textTransform: 'uppercase' }}
                                startIcon={<AttachFileIcon />}
                                ButtonText={"Attach"}
                            > */}

                                <input
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleImageSelect}
                                    accept="image/x-png,image/gif,image/jpeg"
                                    // hidden
                                />
                            {/* </CustomButton> */}
                        </Card>
                    </Grid>
                    <NewInputFieldStructure
                        label='Tag line'
                        variant='outlined'
                        isEdit={isEdit}
                        isFull
                        error={errors?.["marketing.tagLine"]}
                        value={tagLine}
                        handleChange={(e) => handleChange(e, "marketing", "tagLine")}
                    />
                    <NewInputFieldStructure
                        label='Description'
                        variant='outlined'
                        isEdit={isEdit}
                        multiline
                        rows={2}
                        isFull
                        error={errors?.["marketing.description"]}
                        value={description}
                        handleChange={(e) => handleChange(e, "marketing", "description")}
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default React.memo(MarketingCard)