import React, { useRef } from 'react'
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
import Image from 'next/image'

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

    const { tagLine, description, image } = form.marketing
    const { openSnackbar } = useSnackbar();
    const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false)

    const handleOpenUploadPopup = () => {
        setIsUploadPopupOpen(true)
    }

    const handleCloseUploadPopup = () => {
        setIsUploadPopupOpen(false)
    }

    const [selectedImage, setImage] = useState('')
    const [cropData, setCropData] = useState('')
    const [cropper, setCropper] = useState(false)
    const fileInputRef = useRef(null);
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
        reader.onload = (ev) => {

            setImage(reader.result)

        }
        reader.readAsDataURL(files[0])
        handleOpenUploadPopup()

    }

    const handleImageRemove = () => {

        setImage('')
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        handleCloseUploadPopup()
    }

    return (
        <Grid item xs={12} id="marketing">
            <UploadMarketingImage open={isUploadPopupOpen} image={selectedImage} setImage={setImage} onClose={handleCloseUploadPopup} handleClose={handleCloseUploadPopup} changeImage={handleImageSelect} handleChange={handleChange} removeImage={handleImageRemove} />
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
                        {image &&
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="The Property image"
                                src={image}
                            />
                        }
                        <Card sx={{ display: 'flex', p: 2 }}>
                            <Typography sx={{ flex: 1, alignSelf: 'center' }}>Upload</Typography>
                            <>
                                <input
                                    id="contained-button-file"
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/x-png,image/gif,image/jpeg"
                                    style={{ display: 'none' }}
                                />
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                }}>
                                    <label htmlFor="contained-button-file">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<AttachFileIcon />}
                                        >
                                            Banner Image
                                        </Button>
                                    </label>
                                    {/* <Typography sx={{ flex: 1, alignSelf: 'center', marginTop: "5px" }}>{selectedImage ? selectedImage : image}</Typography> */}
                                </div>
                            </>
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