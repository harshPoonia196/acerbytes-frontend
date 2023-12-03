import React, { useState } from 'react'
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
  } from "@mui/material";
  import DoneIcon from "@mui/icons-material/Done";
import RatingDetails from './RatingDetails';

  

const RatingDialog = (props) => {

    const {openDialog, setOpenDialog, broker} = props

    const [submitReview, setSubmitReview] = useState(false)
   
 
      const handleDialogClose = () => {
        setOpenDialog(false);
      }

      const handelReviewSubmit = () => {
        setSubmitReview(true)
      }




  return (
    <>
        <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={openDialog}
      fullWidth={!submitReview && 'xsm'}
      onClose={handleDialogClose}>

      <DialogTitle>
        {!submitReview? 
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
         Review for {broker?.name}
        </Typography> : 
        
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
         Thank You, Your Review has been submitted
        </Typography> 

        }
      </DialogTitle>
      <DialogContent>
      {!submitReview &&
        <Box sx={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>

          <RatingDetails key={'Professionalism'} title={'Professionalism'}/>
          <RatingDetails key={'Communication '} title={'Communication'}/>
          <RatingDetails key={'Real-estate'} title={'Real estate knowledge'}/>

          <Box sx={{}}>
            <TextField
            fullWidth
            variant="standard"
            label="Comments"
            multiline
            maxRows={2} />
          </Box>

          <Box sx={{alignSelf:'end'}}>
            <Button onClick={handelReviewSubmit} startIcon={<DoneIcon />}
             variant="contained">Submit</Button>
          </Box>


        </Box>}
      </DialogContent>
      </Dialog>
  
    </>
  )
}

export default RatingDialog
