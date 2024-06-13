import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  Fab,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import React from "react";
import colors from "styles/theme/colors";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import { boxShadowTop } from "utills/Constants";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';

function BottomFooterUser({
  divRef,
  handlefavClick,
  isLogged,
  propertyData,
  url,
  handleOpenEnquiryForm,
}) {

  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 1000,
          display: { xs: "block", evmd: "none" },
          boxShadow: boxShadowTop,
        }}
      >
        <BottomNavigation
          showLabels
          sx={{
            justifyContent: "space-evenly",
            "& .MuiBottomNavigationAction-root": {
              padding: 1,
              width: "100%",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "0.6rem !important", sm: "0.8rem !important" },
            },
            "& .Mui-selected": {
              fontSize: { xs: "0.6rem !important", sm: "0.8rem !important" },
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.25rem",
            },
          }}
          // value={value}
          // onChange={(event, newValue) => {
          //     setValue(newValue);
          // }}
        >
          {isLogged ? (
            <BottomNavigationAction
              sx={{ flex: "0 1 auto", minWidth: 0 }}
              label="Like"
              icon={
                propertyData?.isFav ? (
                  <ThumbUpIcon sx={{ color: colors.BLUE }} />
                ) : (
                  <ThumbUpOffAltIcon />
                )
              }
              onClick={handlefavClick}
            />
          ) : (
            <BottomNavigationAction
              sx={{ flex: "0 1 auto", minWidth: 0 }}
              label="Like"
              onClick={() => router.push(listOfPages.login)}
              icon={<ThumbUpOffAltIcon />}
            />
          )}
          <BottomNavigationAction
            sx={{ flex: "0 1 auto", minWidth: 0 }}
            label="Share"
            component="a"
            href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
            url?.href ? url?.href : ''
          )}`}
          target="_blank"
          data-action="share/whatsapp/share"
            icon={<ReplyIcon sx={{ transform: "scaleX(-1)" }} />}
          />
          <BottomNavigationAction
            sx={{ flex: "0 1 auto", minWidth: 0 }}
            label="Contact"
            onClick={handleOpenEnquiryForm}
            icon={<WhatsAppIcon />}
          />
          <BottomNavigationAction
            sx={{ flex: "0 1 auto", minWidth: 0 }}
            label="Enquire"
            icon={<AssignmentIcon />}
            onClick={handleOpenEnquiryForm}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}><ListItemIcon><Person2Icon fontSize="small"/></ListItemIcon> Profile</MenuItem>
            <MenuItem onClick={handleClose}><ListItemIcon><AccountCircleIcon fontSize="small"/></ListItemIcon> My account</MenuItem>
            <MenuItem onClick={handleClose}><ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon> Logout</MenuItem>
          </Menu>
        </BottomNavigation>
      </Box>
      <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          display: { xs: "none", evmd: "flex" },
          flexDirection: "column",
        }}
      >
        {isLogged ? (
          <Fab
            variant="extended"
            sx={{ mb: 1, justifyContent: "flex-start" }}
            onClick={handlefavClick}
          >
            {propertyData?.isFav ? (
              <ThumbUpIcon sx={{ color: colors.BLUE, mr: 1 }} />
            ) : (
              <ThumbUpOffAltIcon sx={{ mr: 1 }} />
            )}
            Like
          </Fab>
        ) : (
          <Fab
            variant="extended"
            sx={{ mb: 1, justifyContent: "flex-start" }}
            onClick={() => router.push(listOfPages.login)}
          >
            <ThumbUpOffAltIcon sx={{ mr: 1 }} />
            Like
          </Fab>
        )}
        <Fab
          variant="extended"
          sx={{
            mb: 1,
            justifyContent: "flex-start",
            width: "100%",
          }}
          component="a"
          href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
            url?.href ? url?.href : ''
          )}`}
          target="_blank"
          data-action="share/whatsapp/share"
        >
          <ReplyIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />
          Share
        </Fab>
        <a href={`https://wa.me/+919323996997`} target="_blank">
          <Fab variant="extended" sx={{ mb: 1, justifyContent: "flex-start" }}>
            <WhatsAppIcon sx={{ mr: 1 }} />
            Contact
          </Fab>
        </a>

        <Fab
          variant="extended"
          sx={{ justifyContent: "flex-start" }}
          onClick={handleOpenEnquiryForm}
        >
          <AssignmentIcon sx={{ mr: 1 }} />
          Enquire
        </Fab>
      </Box>
    </>
  );
}

export default BottomFooterUser;
