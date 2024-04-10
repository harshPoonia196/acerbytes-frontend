import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Avatar,
  Typography,
  Box,
  Rating,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CallIcon from "@mui/icons-material/Call";
import { useState } from "react";
import RatingDialog from "./Dialog/RatingDialog";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ShieldIcon from "@mui/icons-material/Shield";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import moment from "moment";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { useAuth } from "utills/AuthContext";
import { listOfPages } from "Components/NavBar/Links";
import { countryCodeFormating } from "utills/utills";

const labels = (rating) => {
  if (rating <= 0.5) {
    return "Useless";
  }
  if (rating <= 1) {
    return "Useless+";
  }
  if (rating <= 1.5) {
    return "Poor";
  }
  if (rating <= 1.5) {
    return "Poor";
  }
  if (rating <= 1.5) {
    return "Poor";
  }
  if (rating <= 2) {
    return "Poor+";
  }
  if (rating <= 2.5) {
    return "Ok";
  }
  if (rating <= 3) {
    return "Ok+";
  }
  if (rating <= 3.5) {
    return "Good";
  }
  if (rating <= 4) {
    return "Good+";
  }
  if (rating <= 4.5) {
    return "Excellent";
  }
  if (rating <= 5) {
    return "Excellent+";
  }
  return "";
};

function BrokerCard({ broker, type, noReview, updateBroker, enquiredInfo, handleEnquireWithBroker }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { userDetails, isLogged } = useAuth();

  const router = useRouter();

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleViewReview = (name) => {
    router.push(`/broker-review?name=${name}`);
  };

  const precision = 0.5;

  const titleCase = (string) => {
    return string ? string.replace(/^\w/, c => c.toUpperCase()) : string
  }

  const isEnquiredByCurrentBroker = enquiredInfo?.brokerId == broker?.id;

  const handleCallClick = () => {
    if (typeof handleEnquireWithBroker === 'function') {
      if (isEnquiredByCurrentBroker) {
        const callHref = `tel:${(broker?.phone?.countryCode || "") + (broker?.phone?.number || "")}`;
        if (callHref) {
          window.location.href = callHref;
        }
      } else {
        handleEnquireWithBroker(broker?.id);
      }
    } else {
      console.error('handleEnquireWithBroker is not a function');
    }
  }
  return (
    <Card sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", p: 2 }}>
        <Avatar
          alt="Remy Sharp"
          src = {broker.profilePicture}
          sx={{ mr: 2, width: 56, height: 56 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            {titleCase(broker?.fullName)}
            <DoneAllIcon fontSize="1rem" sx={{ alignSelf: "center", ml: 1 }} />
          </Typography>
          <Typography variant="body2">
            {broker?.currentAddress?.city || ""}{" "}
            {broker?.currentAddress?.city ? <>&#183;</> : ""}{" "}
            {titleCase(broker?.type) || "Consultant"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "1rem",
              mt: 0.5,
            }}
          >
            {/* <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row" },
                  alignItems: { xs: "center" },
                }}
              >
                <Rating
                  name="text-feedback"
                  value={broker?.rating}
                  readOnly
                  precision={precision}
                  sx={{ fontSize: "1rem" }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="1rem" />
                  }
                />
                <Typography
                  variant="body2"
                  sx={{ ml: { xs: 1, sm: 0, md: 1 } }}
                >
                  {labels(broker?.rating)}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{}}>
                <i>{broker?.clients || 50} clients served</i>
              </Typography>
            </Box> */}
            {
              !noReview ? (
                <Box sx={{ alignSelf: "end" }}>
                  {type ? (
                    <CustomButton
                      onClick={() => handleViewReview(broker?.name)}
                      size="small"
                      variant="outlined"
                      ButtonText={"View Reviews"}
                    />
                  ) : (
                    <CustomButton
                      onClick={handleDialogOpen}
                      size="small"
                      variant="outlined"
                      ButtonText={"Rate your experience"}
                    />
                  )}
                </Box>
              ) : (
                <></>
              )
              // (
              //   <Box sx={{ alignSelf: "end" }}>
              //     <Button
              //       onClick={handleDialogOpen}
              //       size="small"
              //       variant="outlined"
              //     >
              //       Write your experience
              //     </Button>
              //   </Box>
              // )
            }
          </Box>
        </Box>
      </Box>
      {/* {broker?.phone?.number ? (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <a
            href={`tel:${(broker?.phone?.countryCode || "") + (broker?.phone?.number || "")
              }`}
          >
            <IconButton>
              <CallIcon fontSize="small" />
            </IconButton>
          </a>
        </Box>
      ) : null} */}
      {/* {isLogged ? ( */}
      {!isEnquiredByCurrentBroker ? (<Box sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleCallClick}  >
        <IconButton>
          <CallIcon fontSize="small" />
        </IconButton>
      </Box>) :
        <Box sx={{ position: "absolute", top: 8, right: 8 , cursor: "pointer", color: "blue"}} onClick={handleCallClick} >
          {(countryCodeFormating(broker?.phone?.countryCode) || "") + (broker?.phone?.number || "")}          
        </Box>
      }
      {/* // : (
      //   <Box sx={{ position: "absolute", top: 8, right: 8 }}>
      //     <IconButton onClick={() => router.push(listOfPages.login)}>
      //       <CallIcon fontSize="small" />
      //     </IconButton>
      //   </Box>
      // )} */}
      <Divider />
      {!noReview && (
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid
            item
            xs={12}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Typography variant="h6">Status: </Typography>
            {broker?.reviews?.isPrivate ? (
              <ShieldIcon color="primary" fontSize="1rem" />
            ) : (
              <RemoveModeratorIcon color="primary" fontSize="1rem" />
            )}
          </Grid>
          {broker?.reviews?.ratings?.map((rating) => {
            return (
              <Grid item xs={4} key={rating?.type}>
                <Typography variant="h6">{rating?.type}</Typography>
                <Rating
                  name="text-feedback"
                  value={rating?.rating}
                  readOnly
                  precision={precision}
                  sx={{ fontSize: "1rem" }}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55 }}
                      fontSize="small"
                      sx={{ fontSize: "1rem" }}
                    />
                  }
                />
              </Grid>
            );
          })}
          {broker?.reviews?.note ? (
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Box sx={{ background: "whitesmoke", p: 2 }}>
                <Typography variant="caption">
                  You wrote a Public review
                  {broker?.reviews?.createdAt
                    ? moment(broker?.reviews?.createdAt).format(
                      " on DD MMM, YYYY"
                    )
                    : ""}
                </Typography>
                <Typography variant="body2">
                  <i>{broker?.reviews?.note}</i>
                </Typography>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      )}

      {openDialog ? (
        <RatingDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          broker={broker}
          updateBroker={updateBroker}
        />
      ) : null}
    </Card>
  );
}

export default BrokerCard;
