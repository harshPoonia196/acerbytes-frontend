import { Avatar, Box, Card, Button, Menu, Rating, Typography, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react'
import StarIcon from "@mui/icons-material/Star";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import { ratingLabels } from 'utills/utills';

const BrokerDetails = (props) => {
  const { name, data } = props,
    [anchorEl, setAnchorEl] = useState(null),
    open = Boolean(anchorEl),

    handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    },

    handleClose = () => {
      setAnchorEl(null);
    },

    getRating = (rating) => {
      let data = Math.floor(rating),
        decimal_point = rating % 2;
      if (decimal_point == .5) {
        data = data + .5
      } else if (decimal_point > .5) {
        data = data + 1
      }
      return data;
    }


  return (
    <>
      <Box sx={{
        px: 2,
        display: 'flex', gap: '1rem',
        flexDirection: { xs: 'column', evmd: 'row' },

      }}>
        <Box sx={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
            <Avatar
              alt="Remy Sharp"
              src={data?.profilePicture}
            />
            <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
              {data?.fullName ?? ''}
            </Typography>
          </div>
          {/* <Typography sx={{ my: '4px' }} variant="body1">{'6133 Rockside Rd #400 , independence, OH'}</Typography> */}

          <div style={{ marginLeft: '7.5%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                name="text-feedback"
                value={data?.rating}
                readOnly
                precision={0.5}
                sx={{ fontSize: "1rem" }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} sx={{ fontSize: "1rem" }} />}
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {ratingLabels(data?.rating)}
              </Typography>
            </Box>
            <Typography variant="body2">{data?.ratingCount} Reviews</Typography>
          </div>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', evmd: 'column' }, justifyContent: 'space-between' }}>
          {/* <Box>
            <CustomButton startIcon={<DriveFileRenameOutlineRoundedIcon />} size='small' variant='contained' ButtonText={"Write a Review"} />
          </Box> */}
          {/* <Box sx={{ textAlign: 'end' }}>
            <CustomButton
              size='small'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<ExpandMoreOutlinedIcon size='small' />}

              ButtonText={"Sort By"}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Most Helpful</MenuItem>
              <MenuItem onClick={handleClose}>Recent</MenuItem>
            </Menu>
          </Box> */}
        </Box>
      </Box >
    </>
  )
}

export default BrokerDetails
