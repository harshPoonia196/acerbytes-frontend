import React, { useState } from "react";
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
import RatingDetails from "./RatingDetails";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import colors from "styles/theme/colors";
import { reviewBroker } from "api/UserProfile.api";
import { useMutate } from "utills/ReactQueryContext";
import { useSnackbar } from "utills/SnackbarContext";

const RatingDialog = (props) => {
  const { openDialog, setOpenDialog, broker, updateBroker } = props;
  const { openSnackbar } = useSnackbar();

  const onSuccess = (res) => {
    setSubmitReview(true);
    openSnackbar(res?.data?.message || "Success!", "success");
    let overallRating = 0;
    for (let i = 0; i < rating?.subRatings?.length; i++) {
      overallRating += rating?.subRatings[i]?.rating || 0;
    }
    overallRating = overallRating / (rating?.subRatings?.length || 1);
    let newRating =
      ((broker?.rating || 0) * (broker?.ratingCount || 0) -
        (broker?.reviews?.overallRating || 0) +
        overallRating) /
      (broker?.ratingCount + (broker?.reviews ? 0 : 1) || 1);
    updateBroker({
      ...broker,
      rating: newRating,
      ratingCount: broker?.ratingCount + (broker?.reviews ? 0 : 1) || 0,
      reviews: {
        ...(broker?.reviews || {}),
        note: rating?.note || "",
        isPrivate: rating?.isPrivate || false,
        ratings: rating?.subRatings || [],
        createdAt: broker?.reviews?.createdAt || new Date(),
      },
    });
  };

  const onError = (err) => {
    openSnackbar(err?.response?.data?.message || "Error", "error");
  };

  const mutate = useMutate(reviewBroker, onSuccess, onError);

  const [submitReview, setSubmitReview] = useState(false);

  const defaultRating = {
    subRatings: [
      {
        type: "Professionalism",
        description: "This includes Communication",
        rating: 0,
      },
      {
        type: "Communication",
        description: "This includes Communication",
        rating: 0,
      },
      {
        type: "Real estate knowledge",
        description: "This includes Communication",
        rating: 0,
      },
    ],
    note: "",
    isPrivate: false,
  };

  const [rating, setRating] = useState(defaultRating);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleRatingChange = (rating, index) => {
    setRating((existingRating) => {
      existingRating.subRatings[index].rating = rating;
      return { ...existingRating };
    });
  };

  const handleNoteChange = (e) => {
    e.persist();
    setRating((existingRating) => {
      existingRating.note = e.target.value || "";
      return { ...existingRating };
    });
  };

  const handelReviewSubmit = () => {
    const requestBody = {
      brokerId: broker?._id,
      note: rating?.note || "",
      isPrivate: rating?.isPrivate || false,
      ratings: rating?.subRatings?.map((subrating) => ({
        type: subrating?.type || "",
        rating: subrating?.rating || 0,
      })),
    };
    mutate.mutate(requestBody);
  };

  const handleIsPrivateChange = (e) => {
    e.persist();
    setRating((existingRating) => {
      existingRating.isPrivate = !e.target.checked;
      return { ...existingRating };
    });
  };

  React.useEffect(() => {
    if (broker?.reviews) {
      setRating((existingRating) => {
        let subrating = defaultRating.subRatings;
        for (let i = 0; i < subrating?.length; i++) {
          for (let j = 0; j < broker?.reviews?.ratings?.length; j++) {
            if (subrating[i]?.type == broker?.reviews?.ratings[j]?.type) {
              subrating[i].rating = broker?.reviews?.ratings[j]?.rating || 0;
              break;
            }
          }
        }
        existingRating.subRatings = subrating;
        existingRating.note = broker?.reviews?.note || "";
        existingRating.isPrivate = broker?.reviews?.isPrivate || false;
        return { ...existingRating };
      });
    }
  }, [broker]);

  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
        open={openDialog}
        fullWidth={!submitReview && "xsm"}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          {!submitReview ? (
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Rate and review for{" "}
              <span style={{ color: colors.BLUE }}>{`${
                broker?.name?.firstName || ""
              } ${broker?.name?.lastName || ""}`}</span>
            </Typography>
          ) : (
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Thank you, your review has been submitted
            </Typography>
          )}
        </DialogTitle>
        {!submitReview && (
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              {rating?.subRatings?.map((subRating, index) => {
                return (
                  <RatingDetails
                    key={index}
                    title={subRating?.type || ""}
                    description={subRating?.description || ""}
                    value={subRating?.rating || 0}
                    setValue={(newValue) => handleRatingChange(newValue, index)}
                  />
                );
              })}

              <Grid container spacing={2}>
                <NewInputFieldStructure
                  label="Comment"
                  multiline
                  rows={2}
                  variant="outlined"
                  isFull
                  value={rating?.note || ""}
                  handleChange={handleNoteChange}
                />
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Typography
                    variant="h5"
                    sx={{ flex: 1, alignSelf: "center" }}
                  >
                    Public
                  </Typography>
                  <Switch
                    checked={!rating?.isPrivate}
                    onChange={handleIsPrivateChange}
                  />
                </Grid>
              </Grid>

              <Box sx={{ alignSelf: "end", mt: 1 }}>
                <Button
                  onClick={handelReviewSubmit}
                  startIcon={<DoneIcon />}
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default RatingDialog;
