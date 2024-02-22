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
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname, useRouter } from "next/navigation";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AdminMenuList,
  CommonMenuList,
  ConsultantMenuList,
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
import { ROLE_CONSTANTS } from "Components/config/config";
import { useSnackbar } from "utills/SnackbarContext";

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const isDrawerOpen = useSelector((state) => state.isDrawerOpen);
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userDetails, isLogged, logout, setBrokerPoints, brokerBalance } =
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
    router.replace(url);
  };

  const checkUserUrlAccess = (tempUserDetails) => {
    checkUrlAccess(
      isLogged,
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
        vertical: "top",
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
      <MenuItem
        onClick={() => {
          router.push(listOfPages.userProfile);
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>
      {isLogged ? (
        <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
      ) : null}
    </Menu>
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 16,
      top: 12,
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const DrawerListItem = ({ item }) => {
    return (
      <ListItem key={item.label} disablePadding>
        <ListItemButton
          sx={{ pl: 3 }}
          onClick={() => {
            router.push(item.route);
            handleDrawerClose();
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item?.icon}</ListItemIcon>
          <StyledBadge
            color="secondary"
            badgeContent={
              <Typography variant="body2" sx={{ color: "white" }}>
                99
              </Typography>
            }
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
    return (
      <>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {CommonMenuList.map((item) => (
              <DrawerListItem key={item.label} item={item} />
            ))}
          </List>
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
                  <DrawerListItem key={item.label} item={item} />
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
                  <DrawerListItem key={item.label} item={item} />
                ))}
              </List>
              <Divider />
            </>
            )
          }

          {
            authRole("admin") && (
            <>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Admin
                  </ListSubheader>
                }
              >
                {AdminMenuList.map((item, index) => (
                  <DrawerListItem key={item.label} item={item} />
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
          <List>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton onClick={() => handleDrawerClose()} edge="end">
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => logout()}
                sx={{ pl: 3 }}
                role={undefined}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText secondary="Log out" />
              </ListItemButton>
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
        BackdropProps={{ invisible: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          position: "relative",
        }}
      >
        <DrawerContent />
        <DrawerBottomContent />
      </Drawer>
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
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ alignSelf: "center", height: "fit-content" }}>
              <a
                href={listOfPages.home}
                style={{ textDecoration: "none", lineHeight: "normal" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000",
                    fontSize: "1rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {companyName}
                </Typography>
              </a>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ alignSelf: "center" }}>
              {userDetails?.role == ROLE_CONSTANTS.broker && (
                <Typography>Points: {brokerBalance} &nbsp;&nbsp;</Typography>
              )}
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              {userDetails && Object.keys(userDetails).length ? (
                <Typography>
                  Hi,{" "}
                  <span style={{ color: colors.BLUE }}>
                    {userDetails?.name?.firstName} {userDetails?.name?.lastName}
                  </span>
                </Typography>
              ) : (
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Sign in
                </Button>
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
                    <Avatar src={userDetails?.googleDetails?.profilePicture} />
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
    </Box>
  );
}
