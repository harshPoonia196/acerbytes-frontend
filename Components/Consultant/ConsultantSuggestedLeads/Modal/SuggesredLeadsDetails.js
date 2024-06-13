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

function SuggesredLeadsDetails({ open, handleClose, selectedRowData }) {

  const budget = [
    { title: "Budget", value: formatNumberWithCommas(selectedRowData?.userDetail?.budget?.maximumBudget?.value) },
    { title: "Purpose", value: selectedRowData?.userDetail?.budget?.purpose },
    { title: "Purchase", value: selectedRowData?.userDetail?.budget?.purchase },
    { title: "Demographic", value: selectedRowData?.userDetail?.budget?.demographic },
    { title: "Interested For Loan", value: selectedRowData?.userDetail?.budget?.interestedForLoan },
  ]
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px !important",
          overflowY: "scroll",
        },
      }}
      open={open}
      onClose={handleClose}
      
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          User Details
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: "100%", width: "100%", minWidth: {xs: "300px", sm: "500px"}, overflowY: "auto" }}
      >
          {budget.map(item => <Card sx={{mb: 1}}>
            <Grid container spacing={1} sx={{ p: 2 }}>
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
          </Card>)}
        
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            //   startIcon={<DoneIcon fontSize="small" />}
            variant="contained"
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
