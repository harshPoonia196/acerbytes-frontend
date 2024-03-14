import {
    Box,
    Button,
    IconButton,
    Input,
    Paper,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import { useSnackbar } from "utills/SnackbarContext";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'
import { uploadImage } from "api/Util.api";
import DeleteIcon from '@mui/icons-material/Delete'
import Cropper from 'react-cropper'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import { useLayoutEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import 'cropperjs/dist/cropper.css'
import EditIcon from '@mui/icons-material/Edit'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { LoadingButton } from '@mui/lab'
import UploadIcon from '@mui/icons-material/Upload'

const useStyles = makeStyles((theme) => ({
    copperImage: {
        margin: '0px auto',
        backgroundColor: 'gainsboro',
        minHeight: '300px',
        borderRadius: '0px',
        padding: '1rem',
        cursor: 'pointer',
    },
}))

const UploadMarketingImage = ({
    open,
    handleClose,
    image, changeImage, setImage, removeImage,handleChange
}) => {
    const { openSnackbar } = useSnackbar();
    const classes = useStyles()
    const [loading, setLoading] = useState(false);

    const [cropData, setCropData] = useState('')
    const [cropper, setCropper] = useState(false)
    const [enableCropper, setEnableCropper] = useState(false)


    const showToaterMessages = (message, severity) => {
        openSnackbar(message, severity);
      };

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
    }

    const getCropData = async (e) => {
        e.preventDefault()
        if (typeof cropper !== 'undefined') {
            setCropData(cropper.getCroppedCanvas().toDataURL())
        }
        const blob = await fetch(cropper.getCroppedCanvas().toDataURL()).then(response => response.blob())
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        uploadDocument(file)
    }

    const uploadDocument = async(cropDataIn) => {


        let payload = {
            image: cropDataIn,
        }
        try{
            setLoading(true);
            let response = await uploadImage(payload)
            if (response.data.status == 200) {
                handleChange(response.data.data.Location,"marketing","image")
                handleClose()
            }
        }
        catch (error) {
            showToaterMessages(
              error?.response?.data?.message ||
              error?.message ||
              "Error fetching state list",
              "error"
            );
          }
          finally {
            setLoading(false);
          }

    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Crop the image</DialogTitle>
            <DialogContent>
                <Box sx={{ my: 1 }}>
                    {image && (
                        <div style={{ width: '100%', textAlign: 'center', maxHeight: 400 }}>
                            <Cropper
                                style={{ width: '100%' }}
                                initialAspectRatio={3/3}
                                aspectRatio={3/3}
                                preview=".img-preview"
                                src={image}
                                // ref={imageRef}
                                autoCropArea={1}
                                viewMode={1}
                                guides={true}
                                background={false}
                                zoomable={false}
                                cropBoxMovable={true}
                                cropBoxResizable={false}
                                responsive={true}
                                scalable={false}
                                dragMode={'none'}
                                zoomOnTouch={false}
                                zoomOnWheel={false}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance)
                                }}
                            />
                        </div>
                    )}
                </Box>
            </DialogContent>
            <DialogActions repositionOnUpdate={false}>
                <Box sx={{ flex: 1 }}>
                    <IconButton
                        onClick={() => {

                        }}
                        component="label"
                        sx={{ flexDirection: 'column' }}
                    >
                        <RemoveCircleOutlineIcon fontSize='small'/>
                        <Typography variant="body2" >
                            Change
                        </Typography>
                        <input
                            id="contained-button-file"
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            hidden
                            onChange={changeImage}
                        />
                    </IconButton>
                    <IconButton
                        onClick={removeImage}
                        sx={{ flexDirection: 'column',  }}
                    >
                        <DeleteIcon  fontSize='small'/>
                        <Typography variant="body2" >
                            Delete
                        </Typography>
                    </IconButton>
                </Box>
                <LoadingButton
                    onClick={getCropData}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<UploadIcon />}
                    variant="contained"
                    size='small'
                >
                    Uploads
                </LoadingButton>
            </DialogActions>
        </Dialog >
    )
}

export default UploadMarketingImage
