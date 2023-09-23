"use client";

import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  TableSortLabel,
  Chip,
  Menu,
  MenuItem,
  Button,
  Card,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputField from "Components/CommonLayouts/InputField";
import { visuallyHidden } from "@mui/utils";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [anchorElCurrent, setAnchorElCurrent] = React.useState(null);
  const openCurrent = Boolean(anchorElCurrent);
  const handleClickCurrent = (event) => {
    setAnchorElCurrent(event.currentTarget);
  };
  const handleCloseCurrent = () => {
    setAnchorElCurrent(null);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.first}</TableCell>
        <TableCell>{row.last}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.urgency}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>
          <Chip label="Clickable" size="small" onClick={handleClickCurrent} />

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorElCurrent}
            open={openCurrent}
            onClose={handleCloseCurrent}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              onClick={handleCloseCurrent}
            >
              Profile
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              onClick={handleCloseCurrent}
            >
              My account
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              onClick={handleCloseCurrent}
            >
              Logout
            </MenuItem>
          </Menu>
        </TableCell>
        <TableCell>
          <Chip label="Clickable" size="small" onClick={() => {}} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Container maxWidth="lg">
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ display: "flex" }}>
                    <Typography variant="caption" sx={{ flex: 1 }}>
                      Notes
                    </Typography>
                    <Button variant="contained" size="small">
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Old notes</Typography>
                  </Grid>
                  <InputField />
                </Grid>
              </Container>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  {
    first: "Anand",
    last: "Gupta",
    email: "anand@gmail.com",
    phone: 97556655,
    urgency: "yes",
    status: "pending",
    current: "yes",
    next: "yes",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "first",
    numeric: false,
    disablePadding: true,
    label: "First name",
  },
  {
    id: "last",
    numeric: true,
    disablePadding: false,
    label: "Last name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "urgency",
    numeric: true,
    disablePadding: false,
    label: "Urgency",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "current",
    numeric: true,
    disablePadding: false,
    label: "Current action",
  },
  {
    id: "next",
    numeric: true,
    disablePadding: false,
    label: "Next action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="caption">{headCell.label}</Typography>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Enquiries() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container
          maxWidth="lg"
          sx={{ pb: "0 !important", textAlign: "center" }}
        >
          <Box sx={{ py: 4 }}>
            <Typography variant="h4">
              Connect with our professional real estate consultant
            </Typography>
            <Typography variant="h6">75 Active consultant</Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
