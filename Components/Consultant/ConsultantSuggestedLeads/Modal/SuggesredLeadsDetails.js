import {
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Card,
  CardContent 
} from "@mui/material";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import {formatNumberWithCommas} from "utills/CommonFunction";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function SuggesredLeadsDetails({ open, handleClose, selectedRowData }) {

  const budget = [
    { title: "Budget", value: `₹ ${formatNumberWithCommas(selectedRowData?.userDetail?.budget?.maximumBudget?.value)}` },
    { title: "Purpose", value: selectedRowData?.userDetail?.budget?.purpose },
    { title: "Purchase", value: selectedRowData?.userDetail?.budget?.purchase },
    { title: "Demographic", value: selectedRowData?.userDetail?.budget?.demographic },
    { title: "Interested for Loan", value: selectedRowData?.userDetail?.budget?.interestedForLoan },
  ]
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px !important",
          overflowY: "auto",
        },
      }}
      open={open}
      onClose={handleClose}
      
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Customer details
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: "100%", width: "100%", minWidth: {xs: "300px", sm: "500px"}, overflowY: "auto" }}
      >
          {budget.map(item => <Card sx={{mb: 1}}>
            <Card sx={{ p: 2, border: "solid 1px #dcdcdc78" }}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: "0.75rem !important",
                        sm: "0.875rem !important",
                      },
                      fontWeight: 600
                    }}
                  >
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "end" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      alignSelf: "center",
                      flex: 1,
                      fontSize: {
                        xs: "0.75rem !important",
                        sm: "0.875rem !important",
                      },
                    }}
                  >
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Card>)}
        
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            //   startIcon={<DoneIcon fontSize="small" />}
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
            ButtonText={"Close"}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default SuggesredLeadsDetails;
