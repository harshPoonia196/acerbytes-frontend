"use client";

import {
  Table,
  Box,
  TableBody,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import {
  getComparator,
  getDiscountPercentage,
  objectToQueryString,
  stableSort,
} from "utills/CommonFunction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { ORDER_STATUS, ToasterMessages } from "Components/Constants";
import Loading from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";
import { completeOrderRequest, getOrderRequests } from "api/Admin.api";
import AddCreditPointsPopup from "./Modal/AddCreditPointsPopup";
import { useAuth } from "utills/AuthContext";

const rows = [
  {
    name: "Anand Gupta",
    mobileNumber: "+91 125454544",
    lastTopupDate: "10th April, 2023",
    lastTopupAmount: 18000,
    opening: 5000,
    consumedSoFar: 5000,
    balance: 5000,
  },
];

const headCells = [
  {
    id: "orderNumber",
    label: "Order Number",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "mobileNumber",
    label: "Mobile number",
  },
  {
    id: "lastTopupDate",
    label: "Last topup date",
  },
  {
    id: "lastTopupAmount",
    label: "Last topup amount",
  },
  {
    id: "points",
    label: "Points",
  },
  // {
  //   id: "consumedSoFar",
  //   label: "Consumed so far",
  // },
  {
    id: "discount",
    label: "Discount",
  },
  {
    id: "action",
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
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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

function RowStructure({ row, isCompleted, userDetails, handleOrderRequest }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddCredit, setOpenAddCredit] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log("row: ", row);
  // const handleOpenAddCreditPopup = () => {
  //   setOpenAddCredit(true);
  // };

  const handleCloseAddCreditPopup = () => {
    setOpenAddCredit(false);
  };

  const handleAssingPoints = () => {
    handleClose();
    setOpenAddCredit(true);
  };

  const assignPointsHandler = (receivedPayment) => {
    console.log("receivedPayment:", receivedPayment);

    const payload = {
      paidAmount: receivedPayment,
      adminGoogleID: userDetails?.googleID,
      discount: getDiscountPercentage(row?.amount, receivedPayment).toString(),
      status: ORDER_STATUS.COMPLETED,
      orderNumber: row.orderNumber,
      points: row.points
    };

    handleOrderRequest(payload);
  };

  return (
    <>
      <AddCreditPointsPopup
        open={openAddCredit}
        info={{
          name: `${row?.brokerId?.name?.firstName} ${row?.brokerId?.name?.lastName}`,
          points: row.points,
          amount: row.amount,
        }}
        handleClose={handleCloseAddCreditPopup}
        handleSubmit={assignPointsHandler}
      />
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row?.orderNumber}</TableCell>
        <TableCell>
          {row?.brokerId?.name?.firstName} {row?.brokerId?.name?.lastName}
        </TableCell>
        <TableCell>
          {row?.brokerId?.phone?.countryCode} {row?.brokerId?.phone?.number}
        </TableCell>
        <TableCell>{new Date(row?.createdAt).toLocaleString()}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.points}</TableCell>
        {/* <TableCell>{row.consumedSoFar}</TableCell>
      <TableCell>{row.balance}</TableCell> */}
        <TableCell>{isCompleted ? "00%" : row.balance}</TableCell>
        <TableCell>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </TableCell>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleAssingPoints}>Assign points</MenuItem>
        </Menu>
      </TableRow>
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TableView({ status }) {
  const { userDetails } = useAuth();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setLoading] = React.useState(false);
  const [orderRequests, setOrderRequests] = React.useState({});

  React.useEffect(() => {
    console.log("component call...");
    getOrderRequestList();
  }, []);

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getOrderRequestList = async () => {
    try {
      console.log("component call.111..");
      setLoading(true);
      const response = await getOrderRequests(
        objectToQueryString({
          status,
        })
      );
      console.log("response: ", response);
      if (response.status == 200) {
        setOrderRequests(response?.data?.data);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOrderRequest = async (payload) => {
    try {
      setLoading(true);
      const response = await completeOrderRequest(payload);
      console.log("response: ", response);
      if (response.status == 200) {
        showToaterMessages(ToasterMessages.ORDER_COMPLETED_SUCCESS, "success");
        getOrderRequestList();
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log("orderRequests: ", orderRequests);
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );
  return isLoading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {orderRequests?.list?.map((row, index) => (
            <RowStructure
              row={row}
              userDetails={userDetails}
              key={index}
              isCompleted={status === ORDER_STATUS.COMPLETED}
              handleOrderRequest={handleOrderRequest}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

function CreditTable() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableView status={ORDER_STATUS.PENDING} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableView status={ORDER_STATUS.COMPLETED} />
      </CustomTabPanel>
    </Box>
  );
}

export default CreditTable;
