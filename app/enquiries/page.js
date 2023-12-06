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
  Card, AvatarGroup, Avatar
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputField from "Components/CommonLayouts/InputField";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";
import Footer from "Components/Footer";

function Row(props) {
  const { row, history } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.project}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.urgency}</TableCell>
        <TableCell>{row.buyingType}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.enquired}</TableCell>
        <TableCell>{row.consultedBy}</TableCell>
        <TableCell>
          <Chip label="View contact" size="small" onClick={() => { history.push('/join-now') }} sx={{ fontSize: '0.75rem' }} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  {
    project: "Godrej forest",
    phone: "+91 97******97",
    urgency: "High",
    price: "₹ 120",
    enquired: "2 days ago",
    buyingType: 'Investor',
    consultedBy: 5,
    location: "Noida, Sector 150",
    next: "yes",
  },
  {
    project: "Godrej forest",
    phone: "+91 97******97",
    urgency: "Low",
    price: "₹ 120",
    enquired: "2 days ago",
    buyingType: 'Buyer',
    consultedBy: 1,
    location: "Noida, Sector 150",
    next: "yes",
  },
  {
    project: "Godrej forest",
    phone: "+91 97******97",
    urgency: "Medium",
    price: "₹ 120",
    enquired: "2 days ago",
    buyingType: 'User',
    consultedBy: 1,
    location: "Noida, Sector 150",
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
    id: "project",
    numeric: false,
    disablePadding: true,
    label: "Project name",
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
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
    id: "buyingType",
    numeric: true,
    disablePadding: false,
    label: "Buying type",
  },
  {
    id: "budget",
    numeric: true,
    disablePadding: false,
    label: "Max budget",
  },
  {
    id: "enquired",
    numeric: true,
    disablePadding: false,
    label: "Enquired",
  },
  {
    id: "consultedBy",
    numeric: true,
    disablePadding: false,
    label: "Consulted by",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
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

  const history = useRouter()

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container
          maxWidth="lg"
          sx={{ pb: "0 !important" }}
        >
          <Box sx={{ py: 4 }}>
            <Typography variant="h1"
              sx={{ color: "#000" }}>
              Explore a world of possibilities with{' '}
              <span className="urlStyling" style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => { history.push('/join-now') }}>
                5,433</span> open real estate queries. Your next customer is just a click away
            </Typography>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Box sx={{ width: 'fit-content', margin: 'auto', }}>
                <AvatarGroup
                  total={5}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </Box>
              <Typography variant="h3" sx={{ flex: 1, alignSelf: 'center', my: 2 }}>
                Be a part of approved consultants community
              </Typography>
              <Button variant="contained" sx={{ alignSelf: 'center' }} onClick={() => { history.push('/join-now') }}>Join as real estate consultant</Button>
            </Box>

          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Typography variant="h6"
          sx={{
            color: "#000",
            fontSize: "1rem",
            fontWeight: 900,
            lineHeight: 1,
            mb: 2
          }}>Leads panel</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} history={history} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}
