"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  IconButton,
  Button,
  MenuItem,
  Menu,
  ListSubheader,
  Card,
  Badge,
  Avatar, Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AdminMenuList,
  CSRMenuList,
  CommonMenuList,
  ConsultantMenuList,
  SMRMenuList,
  ToBeRemoved,
  UserMenuList,
  companyName,
  listOfPages,
} from "./Links";
import { useDispatch, useSelector } from "react-redux";
import {
  setDrawerStateOpen,
  setDrawerStateClose,
} from "state/DrawerStore/action";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  authRole,
  checkUrlAccess,
  isLoggedIn,
  logoutUser,
  matchUserRole,
} from "utills/utills";
import colors from "styles/theme/colors";
import { checkTokenAPI } from "api/Auth.api";
import { useAuth } from "utills/AuthContext";
import { getBrokerBalance } from "api/Broker.api";
import { ROLES, ROLE_CONSTANTS } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { getRoleLabelByValue } from "utills/CommonFunction";
import Logo from 'public/images/icon.svg';
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const isDrawerOpen = useSelector((state) => state.isDrawerOpen);
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userDetails, isLogged, logout, isLoggedIn, setBrokerPoints, brokerBalance } =
    useAuth();

  React.useEffect(() => {
    const userInfo = localStorage.getItem("userDetails");
    checkUserUrlAccess(JSON.parse(userInfo));
  }, [pathname]);

  React.useEffect(() => {
    if (
      userDetails &&
      Object.keys(userDetails).length &&
      userDetails?.role == ROLE_CONSTANTS.broker
    ) {
      getBrokerpointBalance();
    }
  }, [userDetails && Object.keys(userDetails).length]);

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getBrokerpointBalance = async () => {
    try {
      const response = await getBrokerBalance();
      if (response.status == 200) {
        setBrokerPoints(response?.data?.data?.balance || 0);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error getbroker balance request",
        "error"
      );
    }
  };

  const redirectUser = (url) => {
    const {
      search
    } = window?.location
    router.replace(url + (search ?? ""));
  };

  const checkUserUrlAccess = (tempUserDetails) => {
    checkUrlAccess(
      isLoggedIn(),
      pathname,
      redirectUser,
      tempUserDetails?.role || userDetails?.role
    );
  };

  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    if (isDrawerOpen === false) {
      dispatch(setDrawerStateOpen({ isDrawerOpen: true }));
    }
  };

  const handleDrawerClose = () => {
    dispatch(setDrawerStateClose({ isDrawerOpen: false }));
  };

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {(userDetails.role !== "admin" && userDetails.role !== 'superAdmin' && userDetails.role !== ROLE_CONSTANTS.customerSupport && userDetails.role !== ROLE_CONSTANTS.sales) && (
        <MenuItem
          onClick={() => {
            router.push(userDetails.role === "broker" ? listOfPages.consultantProfile : listOfPages.userProfile);
            handleMenuClose();
          }}
        >
          <AccountCircle fontSize="14px" sx={{ mr:1}}/> Profile
        </MenuItem>
      )}
      {isLogged ? (
        <MenuItem onClick={() => logoutUser()}><LogoutIcon fontSize="14px" sx={{ mr:1}} /> Log out</MenuItem>
      ) : null}
    </Menu>
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 16,
      top: 12,
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: 'whitesmoke !important'
    },
  }));

  const DrawerListItem = ({ item }) => {
    return (
      <ListItem key={item.label} disablePadding>
        <ListItemButton
          sx={{ pl: 3 }}
          onClick={() => {
            router.push(item.route);
            router.refresh()
            handleDrawerClose();
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item?.icon}</ListItemIcon>
          <StyledBadge
            color="secondary"
            // badgeContent={
            //   <Typography variant="body2" sx={{ color: "white" }}>
            //     99
            //   </Typography>
            // }
            sx={{ flex: 1 }}
            invisible={false}
          >
            <ListItemText secondary={item.label} />
          </StyledBadge>
        </ListItemButton>
      </ListItem>
    );
  };

  const DrawerContent = () => {

    const isSalesRole = authRole(ROLE_CONSTANTS.sales);
    return (
      <>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {!authRole(ROLE_CONSTANTS.customerSupport) && !isSalesRole && <List subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Public
            </ListSubheader>
          }>
            {CommonMenuList.map((item) => (
              <DrawerListItem key={`common-${item.label}`} item={item} />
            ))}
          </List>}
          <Divider />
          {!authRole(ROLE_CONSTANTS.customerSupport) && !isSalesRole &&
            <>
              {
                ToBeRemoved.map((item) => (
                  <DrawerListItem key={`toberemoved-${item.label}`} item={item} />
                ))
              }
            </>
          }
          <Divider />
          {
            authRole("user") && (
              <>
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Customer / Buyer
                    </ListSubheader>
                  }
                >
                  {UserMenuList.map((item) => (
                    <DrawerListItem key={`user-${item.label}`} item={item} />
                  ))}
                </List>
                <Divider />
              </>
            )
          }
          {
            authRole("broker") && (
              <>
                <List
                  subheader={
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                      sx={{ display: "flex" }}
                    >
                      <p style={{ flex: 1 }}>Consultant</p>{" "}
                      <Box sx={{ alignSelf: "center" }}>
                        <IconButton
                          onClick={() => {
                            router.push(listOfPages.consultantJoinNow);
                          }}
                        >
                          <HowToRegIcon size="small" />
                        </IconButton>
                      </Box>
                    </ListSubheader>
                  }
                >
                  {ConsultantMenuList.map((item, index) => (
                    <DrawerListItem key={`consultant-${item.label}`} item={item} />
                  ))}
                </List>
                <Divider />
              </>
            )
          }
          {
            (authRole(ROLE_CONSTANTS.admin) || authRole(ROLE_CONSTANTS.superAdmin)) && (
              <>
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Admin
                    </ListSubheader>
                  }
                >
                  {AdminMenuList.map((item, index) => (
                    <>
                      <DrawerListItem key={`admin-${item.label}`} item={item} />
                    </>
                  ))}
                </List>
              </>
            )
          }
          {
            (authRole(ROLE_CONSTANTS.customerSupport)) && (
              <>
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Admin
                    </ListSubheader>
                  }
                >
                  {CSRMenuList.map((item, index) => (
                    <>
                      <DrawerListItem key={`admin-${item.label}`} item={item} />
                    </>
                  ))}
                </List>
              </>
            )
          }
          {
            isSalesRole && (
              <>
                <List
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Admin
                    </ListSubheader>
                  }
                >
                  {SMRMenuList.map((item, index) => (
                    <>
                      <DrawerListItem key={`admin-${item.label}`} item={item} />
                    </>
                  ))}
                </List>
              </>
            )
          }
        </Box>
      </>
    );
  };

  const DrawerBottomContent = () => {
    return (
      <>
        <Toolbar />
        <Card
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <List sx={{pb: 0}}>
            <ListItemButton 
                  onClick={() => { router.push('http://wa.me/+919323996997') }}
                  sx={{ pl: 3, backgroundColor: 'whitesmoke', borderTop: 'solid 1px gainsboro' }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <WhatsAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText secondary="Support:  +919818106472" />
                </ListItemButton>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton onClick={() => handleDrawerClose()} edge="end">
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              
              {isLogged ? (
                <ListItemButton
                  onClick={() => logout()}
                  sx={{ pl: 3, backgroundColor: 'whitesmoke', borderTop: 'solid 1px gainsboro' }}
                  role={undefined}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText secondary="Log out" />
                </ListItemButton>
              ) : (
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Sign in
                </Button>
              )}
            </ListItem>
          </List>
        </Card>
      </>
    );
  };

  // const DesktopDrawer = () => {
  //   return (
  //     <Drawer
  //       variant="permanent"
  //       sx={{
  //         width: drawerWidth,
  //         flexShrink: 0,
  //         [`& .MuiDrawer-paper`]: {
  //           width: drawerWidth,
  //           boxSizing: "border-box",
  //           boxShadow: "1px 2px 6px -2px gainsboro",
  //           borderRight: "none",
  //         },
  //         display: { xs: "none", evmd: "flex" },
  //         position: "relative",
  //       }}
  //     >
  //       <DrawerContent />
  //       <DrawerBottomContent />
  //     </Drawer>
  //   );
  // };

  const MobileDrawer = () => {
    return (
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        // hideBackdrop={true}
        // BackdropProps={{ invisible: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          position: "relative",
          [`& .MuiModal-backdrop`]: {
            backgroundColor: 'transparent !important' /* Set the backdrop color to transparent */
          }
        }
        }
      >
        <DrawerContent />
        {
          isLoggedIn() ?
            <DrawerBottomContent />
            : null
        }
      </Drawer >
    );
  };

  return (
    <Box sx={{ display: "-webkit-box" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          p: 0,
          borderRadius: 0,
          backgroundColor: "white",
          boxShadow: "1px 2px 6px -2px gainsboro",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ alignSelf: "center", mr: 2 }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="#000"
                onClick={isDrawerOpen ? handleDrawerClose : handleDrawerOpen}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ alignSelf: "center", }}>
              <Link href={listOfPages.home} prefetch={true} style={{ textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ height: 30, width: 30, background: 'gainsboro', '&:hover': { background: 'gainsboro' }, borderRadius: '4px' }}>
                    <Image priority height={25} width={25} src={Logo} style={{ margin: '2.5px' }} alt="acrebytes" />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#000",
                      fontSize: "1rem",
                      fontWeight: 600,
                      lineHeight: 1,
                      textTransform: "uppercase",
                      alignSelf: 'center'
                    }}
                  >
                    {companyName}
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ alignSelf: "center" }}>
              {userDetails && Object.keys(userDetails).length ? (
                <Box>
                  <Box>
                    <Typography variant='body1' sx={{ display: { sm: 'flex' }, flex: 1, color: colors.BLUE, textTransform: 'capitalize' }}>
                      {userDetails?.name?.firstName} {userDetails?.name?.lastName}
                    </Typography>
                    {/* <Typography variant='body1' sx={{ display: { xs: 'flex', sm: 'none' }, flex: 1, color: colors.BLUE }}>
                      {userDetails?.name?.firstName}
                    </Typography> */}
                  </Box>
                  <Box sx={{ alignSelf: "center", textAlign: "right" }}>
                    {userDetails?.role == ROLE_CONSTANTS.broker && (
                      <Chip label={`Points: ${brokerBalance}`} size="small"
                        onClick={() => router.push(listOfPages.consultantPaymentHistory)} />
                    )}
                    {(userDetails?.role == ROLE_CONSTANTS.admin || userDetails?.role == ROLE_CONSTANTS.sales || userDetails?.role == ROLE_CONSTANTS.customerSupport) && (
                      <Chip label={getRoleLabelByValue(userDetails?.role)} size="small" />
                    )}
                    <Chip label={getRoleLabelByValue(userDetails?.role)} size="small" sx={{ marginLeft: "5px"}} />
                  </Box>
                </Box>
              ) : (
                <CustomButton
                  onClick={() => {
                    router.push("/login");
                  }}
                  ButtonText={"Sign in"}
                />
              )}
            </Box>
            {isLogged && (
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="#000"
                >
                  {userDetails?.googleDetails?.profilePicture ? (
                    <Avatar sx={{ height: 24, width: 24 }} src={userDetails?.googleDetails?.profilePicture} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {isDrawerOpen && <MobileDrawer />}
      {renderMenu}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box >
  );
}
