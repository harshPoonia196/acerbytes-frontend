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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Button, MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ListOfPageLink, SecondListOfPageLink } from "./Links";

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
          router.push("/profile");
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const DrawerListItem = ({ item }) => {
    return (
      <ListItem key={item.label} disablePadding>
        <ListItemButton sx={{ pl: 3 }} onClick={() => router.push(item.route)}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            sx={{
              "& .MuiListItemText-secondary": { fontWeight: "bold !important" },
            }}
            secondary={item.label}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const DesktopDrawer = () => {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "none", md: "flex" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {ListOfPageLink.map((item) => (
              <DrawerListItem item={item} />
            ))}
          </List>
          <Divider />
          <List>
            {SecondListOfPageLink.map((item, index) => (
              <DrawerListItem item={item} />
            ))}
          </List>
        </Box>
      </Drawer>
    );
  };

  const MobileDrawer = () => {
    return (
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={handleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "flex", md: "none" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {ListOfPageLink.map((item, index) => (
              <DrawerListItem item={item} />
            ))}
          </List>
          <List>
            {SecondListOfPageLink.map((item, index) => (
              <DrawerListItem item={item} />
            ))}
          </List>
        </Box>
      </Drawer>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          p: 0,
          borderRadius: 0,
          backgroundColor: "whitesmoke",
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
                onClick={handleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ alignSelf: "center", height: "fit-content" }}>
              <a
                href="/"
                style={{ textDecoration: "none", lineHeight: "normal" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000",
                    fontSize: "1rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  therealtybytes
                </Typography>
              </a>
              <Typography variant="caption" sx={{ color: "#000" }}>
                for better decision in real estate
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ alignSelf: "center" }}>
              <Button>Sign in</Button>
            </Box>
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
                <AccountCircle />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {isDrawerOpen && <DesktopDrawer />}
      {isDrawerOpen && <MobileDrawer />}
      {renderMenu}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
