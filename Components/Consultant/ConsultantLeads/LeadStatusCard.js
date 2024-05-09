import MoreVert from '@mui/icons-material/MoreVert'
import { Box, Card, Divider, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { deleteNote } from 'api/Broker.api'
import React, { useState } from 'react'
import colors from 'styles/theme/colors'

function LeadStatusCard({ name, actionType, type, status, comment, time, noteId, userId, handleOpenUpdatePopup, onNoteDelete }) {

    const [anchorEl, setAnchorEl] = useState(null),
        open = Boolean(anchorEl),
        handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        },

        handleClose = () => {
            setAnchorEl(null);
        },

        onEdit = () => {
            handleClose();
            handleOpenUpdatePopup(true, { name, type, status, comment, time, noteId, userId, });
        },

        onDelete = () => {
            handleClose();
            onNoteDelete(noteId)
        }

    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">
                        <span style={{ color: colors.BLUE, fontWeight: 600 }}>{name}</span> &#183; {actionType} &#183; {status} &#183; &nbsp;
                        <span style={{ color: colors.DISABLED }}>{comment}</span>
                    </Typography>
                    <Typography variant="body2">{time}</Typography>
                </Box>
                <Box>
                    <IconButton size='small' onClick={handleClick}>
                        <MoreVert fontSize='1rem' />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        sx={{
                            '& .MuiList-root': {
                                padding: '0px',
                            },
                        }}
                    >
                        <MenuItem onClick={onEdit}>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={onDelete}>
                            Delete
                        </MenuItem>
                    </Menu>
                </Box>
            </Card>
            <Divider />
        </Grid>
    )
}

export default LeadStatusCard