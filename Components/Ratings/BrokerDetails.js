import { Box, Card, Button, Menu, Rating, Typography, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import StarIcon from "@mui/icons-material/Star";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';


const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const BrokerDetails = (props) => {

  const { name } = props

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Card sx={{
        p: 2,
        display: 'flex', gap: '1rem',
        flexDirection: { xs: 'column', evmd: 'row' },
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
            {/* {name} */}Anand Gupta
          </Typography>
          <Typography sx={{ my: '4px' }} variant="body1">{'6133 Rockside Rd #400 , independence, OH'}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="text-feedback"
              value={4}
              readOnly
              precision={0.5}
              sx={{ fontSize: "1rem" }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} sx={{ fontSize: "1rem" }} />}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {labels[4]}
            </Typography>
          </Box>

          <Typography variant="body2">{'48 Reviews'}</Typography>

        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', evmd: 'column' }, justifyContent: 'space-between' }}>
          <Box>
            <Button startIcon={<DriveFileRenameOutlineRoundedIcon />} size='small' variant='contained'>Write a Review</Button>
          </Box>
          <Box sx={{ textAlign: 'end' }}>
            <Button
              size='small'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<ExpandMoreOutlinedIcon size='small' />}
            >
              Sort By
            </Button>
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
          </Box>
        </Box>
      </Card >
    </>
  )
}

export default BrokerDetails
