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
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material'
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
    image, changeImage, setImage, removeImage
}) => {
    const classes = useStyles()
    const [cropData, setCropData] = useState('')
    const [cropper, setCropper] = useState(false)
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
    }

    const getCropData = (e) => {
        e.preventDefault()
        if (typeof cropper !== 'undefined') {
            setCropData(cropper.getCroppedCanvas().toDataURL())
        }
    }

    const uploadDocument = (cropDataIn) => {
        let payload = {
            image: cropDataIn,
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
                                initialAspectRatio={1}
                                aspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                // ref={imageRef}
                                autoCropArea={1}
                                viewMode={1}
                                guides={true}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
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
                        sx={{ flexDirection: 'column', height: 68, width: 68 }}
                    >
                        <RemoveCircleOutlineIcon />
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#757575' }}>
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
                        sx={{ flexDirection: 'column', height: 68, width: 68 }}
                    >
                        <DeleteIcon />
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#757575' }}>
                            Delete
                        </Typography>
                    </IconButton>
                </Box>
                <LoadingButton
                    onClick={getCropData}
                    // loading={isUploadingImage}
                    loadingPosition="start"
                    startIcon={<UploadIcon />}
                    variant="contained"
                >
                    Upload
                </LoadingButton>
            </DialogActions>
        </Dialog >
    )
}

export default UploadMarketingImage
