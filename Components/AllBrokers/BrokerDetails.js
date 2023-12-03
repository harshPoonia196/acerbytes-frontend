import { Box, Button, Menu, Rating, Typography, MenuItem } from '@mui/material'
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

    const {name} = props

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
       <Box sx={{display:'flex', gap:'1rem', justifyContent:'space-between', flexDirection:{xs:'column', evmd:'row' }}}>
         <Box>
          <Typography variant="h3">{name}</Typography>
          <Typography sx={{my:'0.3rem'}} variant="body2">{'6133 Rockside Rd #400 , independence, OH'}</Typography>
          
          <Box sx={{display:'flex', alignItems:'center', gap:'0.3rem'}}>
          <Rating
            name="text-feedback"
            value={4}
            readOnly
            precision={0.5}
            sx={{ fontSize: "1.25rem" }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
          />
          <Typography variant="body2">
            {labels[4]}
          </Typography>
          </Box>

          <Typography sx={{mt:'0.3rem', fontSize: "0.8rem"}} variant="p">{'48 Reviews'}</Typography>

         </Box>
         <Box sx={{display:'flex', flexDirection:{xs:'row', evmd:'column'}, justifyContent:'space-between'}}>
            <Box><Button startIcon={<DriveFileRenameOutlineRoundedIcon />} size='small' variant='contained'>Write a Review</Button></Box>
            <Box>
            <Button
            size='small'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<ExpandMoreOutlinedIcon size='small'/>}
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
      </Box>
    </>
  )
}

export default BrokerDetails
