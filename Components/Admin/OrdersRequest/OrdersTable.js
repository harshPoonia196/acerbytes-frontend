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
  getApprovedDiscountPercentage,
  objectToQueryString,
  stableSort,
  formatPoints,
  formatAmount,
} from "utills/CommonFunction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { ORDER_STATUS, ToasterMessages } from "Components/Constants";
import Loading from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";
import {
  completeOrderRequest,
  getOrderRequests,
  getSalesPersons,
} from "api/Admin.api";
import AddCreditPointsPopup from "./Modal/AddCreditPointsPopup";
import { useAuth } from "utills/AuthContext";
import {
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "Components/config/config";

const headCells = [
  {
    id: "orderNo",
    label: "Order no",
    isCompleteView: true,
    isPendingView: true,
  },
  {
    id: "name",
    label: "Name",
    isCompleteView: true,
    isPendingView: true,
  },
  {
    id: "mobileNumber",
    label: "Mobile number",
    isCompleteView: true,
    isPendingView: true,
  },
  {
    id: "amount",
    label: "St Amount",
    isCompleteView: true,
    isPendingView: true,
  },
  {
    id: "point",
    label: "St Point",
    isCompleteView: true,
    isPendingView: true,
  },
  {
    id: "discount",
    label: "St discount",
    isCompleteView: true,
    isPendingView: true,
  },
  {
    id: "approvedDiscount",
    label: "Approved discount",
    isCompleteView: true,
    isPendingView: false,
  },
  {
    id: "approvedPayment",
    label: "Approved payment",
    isCompleteView: true,
    isPendingView: false,
  },
  {
    id: "approvedPoints",
    label: "Approved points",
    isCompleteView: true,
    isPendingView: false,
  },
  {
    id: "action",
    label: "Action",
    isCompleteView: false,
    isPendingView: true,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, isCompleted } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells
          ?.filter((rs) => {
            return isCompleted == true ? rs.isCompleteView : rs.isPendingView;
          })
          ?.map((headCell) => (
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
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

function RowStructure({
  row,
  salesPersons,
  isCompleted,
  userDetails,
  handleOrderRequest,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddCredit, setOpenAddCredit] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAddCreditPopup = () => {
    setOpenAddCredit(false);
  };

  const handleAssingPoints = () => {
    handleClose();
    setOpenAddCredit(true);
  };

  const assignPointsHandler = ({
    receivedPayment,
    assignedPoints,
    salesPerson,
  }) => {
    const payload = {
      adminGoogleID: userDetails?.googleID,
      status: ORDER_STATUS.COMPLETED,
      orderNumber: row.orderNumber,
      points: row.points,
      brokerGoogleID: row?.brokerId?.googleID,
      approvedDiscount: getApprovedDiscountPercentage(
        assignedPoints,
        receivedPayment
      )
        .toFixed(2)
        .toString(),
      approvedPayment: receivedPayment,
      approvedPoints: assignedPoints,
      salesPerson,
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
          salesPersons: salesPersons,
        }}
        handleClose={handleCloseAddCreditPopup}
        handleSubmit={assignPointsHandler}
      />
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row.orderNumber}</TableCell>
        <TableCell>
          {row?.brokerId?.name?.firstName} {row?.brokerId?.name?.lastName}
        </TableCell>
        <TableCell>
          {row?.brokerId?.phone?.countryCode} {row?.brokerId?.phone?.number}
        </TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.points}</TableCell>
        <TableCell>{row?.standardDiscount}%</TableCell>
        {isCompleted && <TableCell>{row?.approvedDiscount}%</TableCell>}
        {isCompleted && <TableCell>{formatAmount(row?.approvedPayment)}</TableCell>}
        {isCompleted && <TableCell>{formatPoints(row?.approvedPoints)}</TableCell>}
        {!isCompleted && <TableCell>
          <IconButton
            aria-label="more"
            id="long-button"
            disabled={isCompleted}
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </TableCell>}
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
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGINATION_LIMIT);
  const [initialMount, setInitialMount] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [orderRequests, setOrderRequests] = React.useState({});
  const [salesPersons, setSalesPersons] = React.useState([]);

  React.useEffect(() => {
    // This block will run only on initial mount
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    if (userDetails && Object.keys(userDetails).length) {
      const pageOptions = {
        pageLimit: rowsPerPage,
        page,
      };
      getOrderRequestList(pageOptions);
      getSalesPersonsList();
    }
  }, [userDetails && Object.keys(userDetails).length, initialMount]);

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getOrderRequestList = async (queryParams) => {
    try {
      setLoading(true);
      const response = await getOrderRequests(
        objectToQueryString({
          status,
          ...queryParams,
        })
      );
      if (response.status == 200) {
        setOrderRequests({
          list: response?.data?.data,
          totalCount: response?.data?.totalCount,
          totalPages: response?.data?.totalPages,
          nextPage: response?.data?.nextPage,
          prevPage: response?.data?.prevPage,
        });
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
  const getSalesPersonsList = async () => {
    try {
      setLoading(true);
      const response = await getSalesPersons();
      if (response.status == 200) {
        setSalesPersons(response?.data?.data);
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
      if (response.status == 200) {
        showToaterMessages(ToasterMessages.ORDER_COMPLETED_SUCCESS, "success");
        getOrderRequestList({
          pageLimit: rowsPerPage,
          page,
        });
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
    const page = newPage + 1;
    setPage(page);
    const pageOptions = {
      pageLimit: rowsPerPage,
      page,
    };
    getOrderRequestList(pageOptions);
  };

  const handleChangeRowsPerPage = (event) => {
    const pageLimit = parseInt(event.target.value, 10);
    setRowsPerPage(pageLimit);
    setPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getOrderRequestList(pageOptions);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          isCompleted={status === ORDER_STATUS.COMPLETED}
        />
        <TableBody>
          {orderRequests?.list?.map((row, index) => (
            <RowStructure
              row={row}
              userDetails={userDetails}
              key={index}
              isCompleted={status === ORDER_STATUS.COMPLETED}
              handleOrderRequest={handleOrderRequest}
              salesPersons={salesPersons}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
        component="div"
        count={orderRequests.totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

function OrdersTable() {
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

export default OrdersTable;
