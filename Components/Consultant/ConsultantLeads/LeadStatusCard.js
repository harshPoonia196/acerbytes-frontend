import MoreVert from '@mui/icons-material/MoreVert'
import { Box, Card, Divider, Grid, IconButton, Menu, MenuItem, Typography, ListItemIcon, Tooltip, Chip, Avatar } from '@mui/material'
import { deleteNote } from 'api/Broker.api'
import React, { useState } from 'react'
import colors from 'styles/theme/colors'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {formattedTime} from '../../../utills/CommonFunction';

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

        const profileImage = (name) =>{
            const data = name?.split(" ");
           return data.map((item) => item[0]).join('');
        }

    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center"}}>
                        {name && <><Avatar children={profileImage(name)} size="small"  sx={{mr: 1, height: 32, width: 32}} />&nbsp;
                        <span style={{ color: colors.BLUE, fontWeight: 600 }}>{name}</span> &#183;</>} {actionType} &#183;  &nbsp;
                        <Chip size="small" label={status} color={
                                status === "Purchsed"
                                ? "success"
                                : status === "Didn't Pick Call"
                                ? "error"
                                : "warning"
                            }/>&nbsp;  &#183; &nbsp;
                        <span style={{ color: colors.DISABLED }}>{comment}</span>
                    </Typography>
                    
                </Box>
                <Box sx={{ display: "flex", alignItems: "center"}}>
                <Typography variant="body2">{formattedTime(time)}</Typography>
                    <Tooltip title="More">
                        <IconButton size='small' onClick={handleClick}>
                            <MoreVert fontSize='1rem' />
                        </IconButton>
                    </Tooltip>
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
                            <ListItemIcon><EditIcon fontSize='small'/></ListItemIcon> Edit
                        </MenuItem>
                        <MenuItem onClick={onDelete}>
                            <ListItemIcon><DeleteIcon fontSize='small'/></ListItemIcon> Delete
                        </MenuItem>
                    </Menu>
                </Box>
            </Card>
            <Divider />
        </Grid>
    )
}

export default LeadStatusCard