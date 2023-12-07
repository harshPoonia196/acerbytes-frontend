import React, { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Switch,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import RatingDetails from './RatingDetails';
import NewInputFieldStructure from 'Components/CommonLayouts/NewInputFieldStructure';
import colors from 'styles/theme/colors';

const RatingDialog = (props) => {

  const { openDialog, setOpenDialog, broker } = props

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
          {!submitReview ?
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Rate and review for <span style={{ color: colors.BLUE }}>{broker?.name}</span>
            </Typography>
            :
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Thank you, your review has been submitted
            </Typography>

          }
        </DialogTitle>
        {!submitReview &&
          <DialogContent>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

              <RatingDetails key={'Professionalism'} title={'Professionalism'} />
              <RatingDetails key={'Communication '} title={'Communication'} />
              <RatingDetails key={'Real-estate'} title={'Real estate knowledge'} />

              <Grid container spacing={2}>
                <NewInputFieldStructure label="Comment" multiline rows={2} variant='outlined' isFull />
                <Grid item xs={12} sx={{ display: 'flex' }}>
                  <Typography variant='h5' sx={{ flex: 1, alignSelf: 'center' }}>
                    Private
                  </Typography>
                  <Switch defaultChecked />
                </Grid>
              </Grid>

              <Box sx={{ alignSelf: 'end', mt: 1 }}>
                <Button onClick={handelReviewSubmit} startIcon={<DoneIcon />}
                  variant="contained">Submit</Button>
              </Box>

            </Box>
          </DialogContent>
        }
      </Dialog>

    </>
  )
}

export default RatingDialog
