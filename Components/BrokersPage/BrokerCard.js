import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Avatar,
  Typography,
  Box,
  Rating,
  IconButton,
  Grid,
  Divider,
  Dialog,
  Tooltip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CallIcon from '@mui/icons-material/Call';
import { useState } from 'react';
import RatingDialog from './Dialog/RatingDialog';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import moment from 'moment';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import { countryCodeFormating } from 'utills/utills';
import {
  capitalLizeName,
  getFirstCharacterOfFirstOfFullName,
} from 'utills/CommonFunction';
import Reviews from './reviews';
import PhoneIcon from '@mui/icons-material/Phone';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useAuth } from "utills/AuthContext";

function BrokerCard({ broker, type, noReview, updateBroker, enquiredInfo, handleEnquireWithBroker, allBroker=false, myConsultant=false, showRating = false, hasReviews = false }) {
  const [openDialog, setOpenDialog] = useState(false),
    [openReviews, setOpenReviews] = useState(false),
    { userDetails } = useAuth(),
    router = useRouter(),
    handleDialogOpen = () => {
      setOpenDialog(true);
    },
    handleOpenReviews = () => {
      setOpenReviews(true);
    },
    handleCloseOpenReviews = () => {
      setOpenReviews(false);
    },
    handleViewReview = (name) => {
      router.push(`/broker-review?name=${name}`);
    },
    precision = 0.5,
    titleCase = (string) => {
      return string ? string.replace(/^\w/, (c) => c.toUpperCase()) : string;
    },
    currentEnquiredBroker = enquiredInfo?.find(
      (enquiry) => enquiry?.brokerId?.[0] === broker.id || enquiry.isNew,
    ),
    isEnquiredByCurrentBroker = currentEnquiredBroker?._id ? true : false,
    handleCallClick = () => {
      if (typeof handleEnquireWithBroker === 'function' || myConsultant) {
        if (isEnquiredByCurrentBroker) {
          const callHref = `tel:${
            (broker?.phone?.countryCode || '') + (broker?.phone?.number || '')
          }`;
          if (callHref) {
            window.location.href = callHref;
          }
          
        } else {
          if(myConsultant){
            const callHref = `tel:${(broker?.phone?.countryCode || "") + (broker?.phone?.number || "")}`;
            if (callHref) {
              window.open(callHref, '_blank');
              // window.location.href = callHref;
            }
          } else{
            handleEnquireWithBroker(broker?.id);
          }
          
        }
      } else {
        console.error('handleEnquireWithBroker is not a function');
      }
    };

  const handlePhoneClick = () => {
    // console.log("handlePhoneClick");
    const callHref = `tel:${
      (broker?.phone?.countryCode || '') + (broker?.phone?.number || '')
    }`;
    if (callHref) {
      window.location.href = callHref;
    }
  };

  const getTime = (time) => {
    const startDate = new Date(time),
      diffDate = new Date(new Date() - startDate),
      years = diffDate && diffDate?.toISOString().slice(0, 4) - 1970,
      months = diffDate?.getMonth(),
      days = diffDate?.getDate() - 1;

    return years
      ? `${years + (years > 1 ? ' years ago' : ' year ago')}`
      : months
      ? `${months + (months > 1 ? ' months ago' : ' month ago')}`
      : `${
          days === 0 ? 'Today' : days + (days > 1 ? ' days ago' : ' day ago')
        }`;
  };

  return (
    <Card sx={{ position: 'relative', border: "solid 1px #dcdcdc78" }}>
      <Box sx={{ display: 'flex', p: 2, borderRadius: "5px"}}>
        <Avatar
          alt={titleCase(broker?.fullName)}
          src={broker.profilePicture}
          sx={{ mr: 2, width: 56, height: 56 }}
        >
          {getFirstCharacterOfFirstOfFullName(broker?.fullName)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5">
            <Box
              sx={{ gap: '5px', cursor: 'pointer' }}
              onClick={hasReviews ? handleOpenReviews : null}
            >
              {titleCase(broker?.fullName)}
              <Tooltip title={titleCase(broker?.fullName)}>
                <DoneAllIcon
                  fontSize="1rem"
                  sx={{
                    alignSelf: 'center',
                    position: 'relative',
                    top: '1px',
                    left: '2px',
                  }}
                />
              </Tooltip>
              <Box>
                {showRating ? (
                  <>
                    <div className="rating">
                      <Rating
                        readOnly
                        size="small"
                        name="hover-feedback"
                        precision={0.5}
                        value={broker?.rating ?? 0}
                      />
                      <div className="rating-count"> {broker?.ratingCount ?? 0} {broker?.ratingCount > 1 ? "Ratings" : "Rating"}</div>
                    </div>
                  </>
                ) : null}
              </Box>
            </Box>
          </Typography>
          <Typography variant="body2">
            {broker?.currentAddress?.city || ''}{' '}
            {broker?.currentAddress?.city ? <>&#183;</> : ''}{' '}
            {capitalLizeName(broker?.type) || 'Consultant'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: '1rem',
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
            {/* {
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
            } */}
          </Box>
        </Box>
      </Box>

      <Dialog
        sx={{ '& .MuiDialog-paper': { borderRadius: '8px !important' } }}
        open={openReviews}
        fullWidth={true}
        onClose={handleCloseOpenReviews}
      >
        <Reviews broker={broker} />
      </Dialog>

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
      { userDetails.role !== 'broker' && userDetails.role !== 'admin' && userDetails.role !== 'superAdmin' && !allBroker && <>
      {!isEnquiredByCurrentBroker ? (<Box sx={{ position: "absolute", top: {xs:10, sm:13}, right: 16 }} onClick={handleCallClick}  >
        <IconButton sx={{ boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0)" }}>
          <Tooltip title="Call"><CallIcon fontSize="small" /></Tooltip>
        </IconButton>
      </Box>) :
        <Box sx={{ position: "absolute", top: 8, right: 8, cursor: "pointer", color: "blue" }} onClick={handleCallClick} >
          <Tooltip title="Call"><PhoneIcon sx={{ position: "relative", top: "5px", fontSize: "19px" }} fontSize="small"/> {(countryCodeFormating(broker?.phone?.countryCode) || " ") + (broker?.phone?.number || "")}</Tooltip>
        </Box>
      }</>
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
          {/* <Grid
            item
            xs={12}
            alignItems={"center"}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <Typography variant="h6">Status: </Typography>
            {broker?.reviews?.isPrivate ? (
              <Tooltip title="status review">
                <ShieldIcon color="primary" fontSize="1rem" />
              </Tooltip>
            ) : (
              <Tooltip title="status review ">
                <RemoveModeratorIcon color="primary" fontSize="1rem" />
              </Tooltip>
            )}
          </Grid> */}
          <Grid
            item
            xs={12}
            alignItems={'flex-start'}
            display={'flex'}
            justifyContent={
              broker?.reviews?.ratings.length > 0 ? 'space-between' : 'flex-end'
            }
          >
            {broker?.reviews?.ratings.length > 0 && (
              <Box sx={{ display: 'flex', p: 2, pb: 1, pt: 0 }}>
                <Avatar
                  alt={titleCase(userDetails?.name.firstName)}
                  src={userDetails?.googleDetails.profilePicture}
                  sx={{ mr: 2, width: 40, height: 40 }}
                >
                  {getFirstCharacterOfFirstOfFullName(broker?.name.firstName)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5">
                    <Box
                      sx={{ gap: '5px', cursor: 'pointer' }}
                      onClick={hasReviews ? handleOpenReviews : null}
                    >
                      {titleCase(userDetails?.name.firstName)}{' '}
                      {titleCase(userDetails?.name.lastName)}
                    </Box>
                  </Typography>
                  <Typography variant="body2">
                    {getTime(broker?.reviews?.createdAt)}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box sx={{ alignSelf: 'flex-start' }}>
              {type ? (
                <CustomButton
                  onClick={() => handleViewReview(broker?.name)}
                  size="small"
                  variant="outlined"
                  ButtonText={'View Reviews'}
                />
              ) : (
                <CustomButton
                  startIcon={broker?.reviews?.ratings.length > 0 ? <Tooltip title="Rate"><RateReviewIcon /></Tooltip>: <Tooltip title="Rate"><ReviewsOutlinedIcon /></Tooltip>}
                  onClick={handleDialogOpen}
                  size="small"
                  variant="outlined"
                  ButtonText={
                    broker?.reviews?.ratings.length > 0
                      ? 'Rated'
                      : 'Rate your experience'
                  }
                />
              )}
              {/* <Box>
              {broker?.reviews?.isPrivate ? <LockIcon fontSize="small"/> : <PublicIcon fontSize="small"/>}
              </Box> */}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} sx={{ pl: '71px' }}>
              {broker?.reviews?.ratings?.map((rating) => {
                return (
                  <Grid item xs={12} sm={4} key={rating?.type}>
                    <Typography variant="h6">{rating?.type}</Typography>
                    <Rating
                      name="text-feedback"
                      value={rating?.rating}
                      readOnly
                      precision={precision}
                      sx={{ fontSize: '1rem' }}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="small"
                          sx={{ fontSize: '1rem' }}
                        />
                      }
                    />
                  </Grid>
                );
              })}
              {broker?.reviews?.note ? (
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <Box sx={{ background: 'whitesmoke', p: 2, pt: 1 }}>
                    <Typography variant="caption">
                      {broker?.reviews?.createdAt
                        ? moment(broker?.reviews?.createdAt).format(
                            ' DD MMM, YYYY',
                          )
                        : ''}
                    </Typography>
                    <Typography variant="body2">
                      <i>{broker?.reviews?.note}</i>
                    </Typography>
                  </Box>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
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
