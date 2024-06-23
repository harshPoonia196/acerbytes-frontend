import {
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  List,
} from "@mui/material";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function ConsultantsViewAll({ open, handleClose, propertyData, enquiredInfo, handleEnquireWithBroker }) {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px !important",
          maxHeight: "500px",
          maxWidth: "100%",
          overflowY: "scroll"
        },
      }}
      open={open}
      onClose={handleClose}
      className="consultant-dialog"
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          All Consultants
        </Typography>
      </DialogTitle>
      <DialogContent sx={{maxWidth: "100%", width: "100%", overflowY: "scroll", padding: {xs: "16px !important"}}}>
        <List
          dense
          sx={{ width: "100%", minWidth: {xs:290, sm: 550}, bgcolor: "background.paper", maxWidth: "100%", }}
        >
          {propertyData?.map((broker) => (
            <Grid item xs={12} sm={12} key={broker?.id}>
              <BrokerCard broker={broker} noReview enquiredInfo={enquiredInfo} handleEnquireWithBroker={handleEnquireWithBroker} />
            </Grid>
          ))}
        </List>
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

export default ConsultantsViewAll;
