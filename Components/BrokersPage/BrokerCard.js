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
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAI0AjQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQYHAwQFCAL/xAA9EAABAwMCAggEAwUIAwAAAAABAAIDBAURBiESMQcTIkFRYXGBMpGhsRQjwRUzUmKSJHKCorLC0fFCQ1P/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQMCBP/EAB0RAQEBAQADAQEBAAAAAAAAAAABAhEDEiExQSL/2gAMAwEAAhEDEQA/ALYQhC5dBCEIBCEIEuLfNUWmyAfjqkCQ8o2DicfYJavvLbJaZJ+cjhwsHn5+X/XeqMqaqSqq5KipcSZO1I925yc7ewUtdSLUZ0pafLyJWVkY/iMbSPo7P0UgtGqLJeSG2+4wySf/ACceB/8AScFefBHFI/LZmAn4Q9uNv0X0+d0bxE1jGPbyew5RLx6aBB5boVBW273K3wxzW+5VEcjDksJ7B9W8iPbKtzRmp4tSW8vLWxVkOBNEDt5OHkcH0V6cSFCEKoCkmUlFCRTSQZEIQiBCEIBa1yrqe20UlXVP4YmD1Lj3AeJK2VVvSbejU3Btugl4GUoy8/zkbn1A5epUt46k64utNTVt7qBSyBscHFhkERy4E8uJ3j5Bb9LoSaopRLVTtidIAXN4M7fPbmuPpagNx1NR03NkH5smR389/PkrjqXwwxdvw5BY6tb4zP7FYO0BQQNc81VRI5oPC0NA3UTrLW+jD4pe1EDkOLcFp/4VvS1NO9xAzkb4wudPHRVD+qniDg7Y5Cxnl1L9enXgzZ8in5GcnsgBA/hJIXc03faq21kVfTAB8G0jeQlYebT+ngVKdTaNpaW3S3K2ZaYhxviPIjy8FAuN0LyeN7S7k7iz88r1TXXi1j1r0XablS3egiraGQPgkG3i094I7iFtqu+h+aQ09ygfgNDo5AAdskEE/wCUfJWIu4zoKSZSRAUk0kVkQhCIEIQgFTnSnQst+p4KuEuDqxofjOwcMN5fIq41D+kWz010pKcysb1sTZHMkyctaMOcB3bhuMrnV5HeJbeRFNDTfs+quNe6B9RJVNa6BsXaIBySXHuJ28fPC6NdqS+tjL22+jia7kZpsE+y3ujuiip7A2YM4HVL3743ADiB9lGb3Y6W4XLqoG1DZmyHBkeHtO/mM+yw1qderGbZ8SCkr2SUjqu5RtpS3uPIjyPj5Lg3PVDxUZttJFPEDs5x5rvx2aE6bhpJJzLGHcDcABpeCe0PHGcexVbXi2Vdsr6qGPhfE09UeEbs5ZwO7xBXOMS3603vUk4sOi1QKuhlprvQyUvWRuaHNHE07fP7qsKwTRVTI5GgOGQ1wds4AkfopvpS3OMMRkqagwgduGYAtcPLG+VydU2Z0OqqeCmw38REzsyOy3iJIP1wtManWPkxfVK+hpr+pu7nNwBLG0beRP6qyFDei23x2+zVrQ5/WurXCZrxux7WtaR5jIPzUyW0+x5tSy8oKSZSVQFJNJBkQhCIEIQgFo3dj5IAImMdI4OY3jOAMgg/TK3knNDhgqanZx1nXreuBpq2yWy0st9QWvdE4jI7wTkfQrm3Kmo5L5HTQwudI/tTO6xwDG+fryUoLGwyuxnDhxbnKg2oqueivoAopZ4ZWl7zG7cDPMjvAG52Xn8k+SPX4dfbXQvVTQQUDA6bh6okNYxuMYG2wVd6sqKavraWttc781L+BzJWcGMAAHKnN30/HcaeKehbRzHkD+JIGN/JVze6M01Q2gMDGyEtc6SKXjZHnB328/omZ9d+TX+ViaZZDTRcVVkztAADjsHeS4usLZW1txZdKUdb+F4GNhb8T3Ekn5DC2rNxwUFPBUy8c7Gncnfh4uzn2wpJZKGS4PqZTUhtOyQR9W1mSXAZcSfQtx6LjPbeRd3MndOrpmFsdudKGcDqmeSdzfAuO4XVXzBFHBCyGFobGxoa1oHIBfS9eZyceHevbVpIKaSrkkISQZEIQiGhJCBoSTQYapmWB4+JpXEqnxfietIHZGHEjdd+T925cW6UMh4pqVnE8jtM/iHl5rLyZ638WuIjrBzOw+CKN+3Z4WHI9xso/cPxRt0NOG8A4hnhGceH3W/fbg+OT82MxGMYDHN4SPUKPUVdcKsOjjY/gJwZXDZgWMn9enepziSWqMvnjijPHIAAXHfkPFWdbqSOio44Ih2RufNx3J+ahGl6URRFzRnbHEeZVgdwWnh59rDz9kkCRQhbvOSEJFAJISQZE0kIhoSymgEIWjdLxbrRD1tzrIadvdxu3d6AblBuv3Y70WPuaopbtbU19vsFut3FHAWukM0owZcYw1re7nnffAO3eJbju8FK6n45d4ZCyJ8krGEcu0M7qMQ0EVREGta1rQ7JwAF29TUlXXSwRxvayFvxbbkpU9vZSQtZkl2NyvLud09uNczHzbqdsIIbhbz79R2+OJt0n6jicGCZ4PASeWXch7riXfUVq080m41IEp+GBg4nu9hy98KpdW6qq9SVI4gYKOM/l04dnfxd4n7LXx5s/GPm3m/r0UHBwBaQQdwRvlGV5zsOrb5YY+qt1dI2HOepkw9gPkDy9lYWk+k5lXI2l1EyKB7vhqoWkM9HDJI9eXot+PN1ZJSSY9sjGyRva9jhlrmnII9UKKaEkIMiEsrXuNdT22hmrayTgghbxOP6DxJ5KjNPNFTwvmqJGxRMGXvecNaPMqvb90s22ke6GzUj694/9sh6uM+neflhV3rPU1bqK5yumkeyja7ENMHdloHIkci7zUdRLUxunSXqS4Ncxk8VHGe6lZwnH94kn5YUUmqJp5nTTyOklfu57zkn1KxIRz1tMqpWuZJC9zHsOWuacFp8QpbaelDUFujbDUtp66NoxmdpD/6gfuCoQlkovVjVPS5cpG/2e0UUb8fFJI6QD2HD91HblrrUVx4usrzA12xbTNEY+fP6qN5QpyL7U3OL3Oe5xc5xy5zjkk+JKSEKuRlMOI5JIQda0alvFmcDbq2SFucmMbsP+E7Kz9JdJlNcCylvzY6WpOA2dgxE7172/b0VNIBI5HCLK9TAggEHIIyCE1TXRXq422s/Y1xm/sVS78h7z+5kPd5NO3ofVXIduajp9qsemC7FslFaY39nBnmAPM8mD/UfkrOC89awuZuuoK2rBy18nCzf/wABs36AfNWFcGTdzj4lYyFlAHFjzXwDzKrl8FCbkkQkJpKAQhCAQhCAQhCAQhCA3wQNj4gr0zZa5tzs9FXMwW1EDJPcjf6rzMOavPokrfxmj44c5fSTPiPkPiH0cldR39V1/wCzdNXGrBw9sDmsP8ztm/UrzxJ+/wAd22FcPTBUvi09SU7Nmz1QDz4hrSQPng+ypp5/PSFYwd8+GcpuGMN8Em7yFfTO0QT3lVHw7wSSJySgogQhCgEIQgEIQgEIQgEIQgFO+jLU8VhiuENQ4NZK6N7c+OHA/wC1QRNpxyQf/9k="
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
      {isLogged ? (
        <Box sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleCallClick}  >
          {/* <a
            href={`tel:${
              (userDetails?.phone?.countryCode || "") +
              (userDetails?.phone?.number || "")
            }`}
          > */}
          <IconButton>
            <CallIcon fontSize="small" />
          </IconButton>
          {/* </a> */}
        </Box>
      ) : (
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton onClick={() => router.push(listOfPages.login)}>
            <CallIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
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
