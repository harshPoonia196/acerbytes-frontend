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
  Card,
  ToggleButtonGroup,
  ToggleButton,
  ListItemIcon,
} from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import React from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import {
  getApprovedDiscountPercentage,
  objectToQueryString,
  formatPoints,
  formatAmount,
} from "utills/CommonFunction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToasterMessages } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import {
  completeOrderRequest,
  getOrderRequests,
  getSalesPersons,
} from "api/Admin.api";

import AddCreditPointsPopup from "./Modal/AddCreditPointsPopup";
import { useAuth } from "utills/AuthContext";
import {
  DEBOUNCE_TIMER,
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "utills/Constants";
import { Add } from "@mui/icons-material";
import AdminCreditPointsPopup from "../CreditPointPopup/CreditPointPopup";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import Loader from "Components/CommonLayouts/Loading";
import { debounce } from "lodash";
import { ORDER_STATUS } from "utills/Constants";
import { countryCodeFormating } from "utills/utills";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const headCells = [
  {
    id: "orderNo",
    label: "Order no",
    isCompleteView: true,
    isPendingView: true,
    numeric: false,
  },
  {
    id: "name",
    label: "Property consultant",
    isCompleteView: true,
    isPendingView: true,
    numeric: false,
  },
  {
    id: "mobileNumber",
    label: "Phone",
    isCompleteView: true,
    isPendingView: true,
    numeric: false,
  },
  {
    id: "amount",
    label: "Standard Amount",
    isCompleteView: true,
    isPendingView: true,
    numeric: true,
  },
  {
    id: "point",
    label: "Standard Pts",
    isCompleteView: true,
    isPendingView: true,
    numeric: true,
  },
  {
    id: "discount",
    label: "Standard Disc (%)",
    isCompleteView: true,
    isPendingView: true,
    numeric: true,
  },
  {
    id: "approvedDiscount",
    label: "Approved Disc (%)",
    isCompleteView: true,
    isPendingView: false,
    numeric: true,
  },
  {
    id: "approvedPayment",
    label: "Approved payment",
    isCompleteView: true,
    isPendingView: false,
    numeric: true,
  },
  {
    id: "approvedPoints",
    label: "Approved points",
    isCompleteView: true,
    isPendingView: false,
    numeric: true,
  },
  {
    id: "action",
    label: "Action",
    isCompleteView: false,
    isPendingView: true,
    numeric: false,
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
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
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

function CreditPointModel({ open, info, handleClose, handleSubmit }) {
  return (
    <AddCreditPointsPopup
      open={open}
      info={info}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
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
      brokerGoogleID: row?.brokerId?._id,
      approvedDiscount: getApprovedDiscountPercentage(
        assignedPoints,
        receivedPayment
      )
        .toFixed(0)
        .toString(),
      approvedPayment: receivedPayment,
      approvedPoints: assignedPoints,
      salesPerson,
    };

    handleOrderRequest(payload);
  };

  return (
    <>
      <CreditPointModel
        open={openAddCredit}
        info={{
          name: `${row?.brokerId?.name?.firstName} ${row?.brokerId?.name?.lastName}`,
          points: row.points,
          amount: row.amount,
          approvedPayment: row.approvedPayment,
          approvedPoints: row.approvedPoints,
          salesPerson: row.salesPerson,
          salesPersons: salesPersons,
        }}
        handleClose={handleCloseAddCreditPopup}
        handleSubmit={assignPointsHandler}
      />

      <TableRow
        hover
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f5f5f5";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <TableCell>{row.orderNumber}</TableCell>
        <TableCell>
          {row?.brokerId?.name?.firstName} {row?.brokerId?.name?.lastName}
        </TableCell>
        <TableCell>
          {countryCodeFormating(row?.brokerId?.phone?.countryCode)}{" "}
          {row?.brokerId?.phone?.number}
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          {formatAmount(row.amount)}
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          {formatPoints(row.points)}
        </TableCell>
        <TableCell sx={{ textAlign: "right" }}>
          {row?.standardDiscount}%
        </TableCell>
        {isCompleted && (
          <TableCell sx={{ textAlign: "right" }}>
            {row?.approvedDiscount}%
          </TableCell>
        )}
        {isCompleted && (
          <TableCell sx={{ textAlign: "right" }}>
            {formatAmount(row?.approvedPayment)}
          </TableCell>
        )}
        {isCompleted && (
          <TableCell sx={{ textAlign: "right" }}>
            {formatPoints(row?.approvedPoints)}
          </TableCell>
        )}
        {!isCompleted && (
          <TableCell sx={{}}>
            <Tooltip title="More">
              <IconButton
                aria-label="more"
                id="long-button"
                disabled={isCompleted}
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                sx={{ p: 0 }}
              >
                <MoreVertIcon fontSize="1rem" />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleAssingPoints}>
            <ListItemIcon>
              <CreditScoreIcon fontSize="small" />
            </ListItemIcon>{" "}
            Assign points
          </MenuItem>
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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TableView({
  status,
  userDetails,
  handleOrderRequest,
  showTostMessages,
  isLoading,
  setLoading,
  getOrderRequestList,
  setRowsPerPage,
  setPage,
  page,
  rowsPerPage,
  initialMount,
  setInitialMount,
  orderRequests,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [salesPersons, setSalesPersons] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER); // Adjust the debounce delay as needed

  function performSearch() {
    const pageOptions = {
      pageLimit: rowsPerPage,
      page,
    };
    getOrderRequestList(pageOptions, searchTerm);
  }
  React.useEffect(() => {
    // This block will run only on initial mount
    if (initialMount) {
      setInitialMount(false);
      return;
    }
    if (userDetails && Object.keys(userDetails).length) {
      getSalesPersonsList();
    }
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [
    userDetails && Object.keys(userDetails).length,
    initialMount,
    searchTerm,
  ]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };
  const getSalesPersonsList = async () => {
    try {
      setLoading(true);
      const response = await getSalesPersons();
      if (response.status == 200) {
        setSalesPersons(response?.data?.data);
      }
    } catch (error) {
      showTostMessages(
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
    getOrderRequestList(pageOptions, searchTerm);
  };

  const handleChangeRowsPerPage = (event) => {
    const pageLimit = parseInt(event.target.value, 10);
    setRowsPerPage(pageLimit);
    setPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getOrderRequestList(pageOptions, searchTerm);
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CustomSearchInput value={searchTerm} onChange={handleSearch} />
      </Card>
      {orderRequests?.list?.length > 0 ? (
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
            sx={{
              overflow: "hidden",
            }}
            rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
            component="div"
            count={orderRequests.totalCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <NoDataCard title={"No data found"} />
      )}
    </>
  );
}

function OrdersTable({ onDashboardDataUpdate }) {
  const { userDetails } = useAuth();
  const [isLoading, setLoading] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const [openAddCreditPoints, setOpenAddCreditPoints] = React.useState(false);
  const [orderRequests, setOrderRequests] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGINATION_LIMIT);
  const [page, setPage] = React.useState(1);
  const [initialMount, setInitialMount] = React.useState(true);
  const { openSnackbar } = useSnackbar();

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const handleCloseAddCreditPopup = () => {
    setOpenAddCreditPoints(false);
  };

  const handleChange = (event, newValue) => {
    if (newValue !== null) setValue(newValue);
  };

  const adminAssignPointsHandler = ({
    approvedPayment,
    approvedPoints,
    salesPerson,
    brokerGoogleID,
    orderNumber,
  }) => {
    const payload = {
      adminGoogleID: userDetails?.googleID,
      status: ORDER_STATUS.PENDING,
      orderNumber: orderNumber,
      points: approvedPoints,
      brokerGoogleID: brokerGoogleID,
      approvedDiscount: getApprovedDiscountPercentage(
        approvedPoints,
        approvedPayment
      )
        .toFixed(0)
        .toString(),
      approvedPayment: approvedPayment,
      approvedPoints: approvedPoints,
      salesPerson,
    };
    handleOrderRequest(payload);
  };

  const handleOrderRequest = async (payload) => {
    try {
      setLoading(true);
      const response = await completeOrderRequest(payload);
      if (response.status == 200) {
        showTostMessages(ToasterMessages.ORDER_COMPLETED_SUCCESS, "success");
        getOrderRequestList({
          pageLimit: rowsPerPage,
          page,
        });
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
      handleCloseAddCreditPopup();
    }
  };

  const orderStatusListing =
    value == 0 ? ORDER_STATUS.PENDING : ORDER_STATUS.COMPLETED;

  const getOrderRequestList = async (queryParams, searchText) => {
    try {
      setLoading(true);
      setOrderRequests({});
      const response = await getOrderRequests(
        objectToQueryString({
          status: orderStatusListing,
          ...queryParams,
          ...(searchText ? { search: searchText } : {}),
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
        onDashboardDataUpdate({
          countInfo: response?.data?.dashboardInfo || {},
          userDetails,
        });
      }
    } catch (error) {
      setOrderRequests({
        list: [],
        totalCount: 0,
        totalPages: 0,
        nextPage: null,
        prevPage: null,
      });
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

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
    }
  }, [userDetails && Object.keys(userDetails).length, initialMount, value]);
  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <Loader />}
      <CustomButton
        variant="contained"
        style={{ display: "flex", marginLeft: "auto" }}
        align="right"
        onClick={() => setOpenAddCreditPoints(true)}
        startIcon={<Add />}
        ButtonText={"Add Order"}
      />

      <AdminCreditPointsPopup
        open={openAddCreditPoints}
        handleClose={handleCloseAddCreditPopup}
        handleSubmit={adminAssignPointsHandler}
      />

      <Card sx={{ my: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          aria-label="Platform"
          sx={{ display: "flex" }}
          onChange={handleChange}
        >
          <ToggleButton size="small" value={0} sx={{ flex: 1, border: "none" }}>
            Pending (Not assigned)
          </ToggleButton>
          <ToggleButton size="small" value={1} sx={{ flex: 1, border: "none" }}>
            Approved (Assigned)
          </ToggleButton>
        </ToggleButtonGroup>
      </Card>

      {value == 0 ? (
        <TableView
          status={ORDER_STATUS.PENDING}
          userDetails={userDetails}
          isLoading={isLoading}
          setLoading={setLoading}
          setPage={setPage}
          page={page}
          rowsPerPage={rowsPerPage}
          handleOrderRequest={handleOrderRequest}
          showTostMessages={showTostMessages}
          setRowsPerPage={setRowsPerPage}
          initialMount={initialMount}
          orderRequests={orderRequests}
          setInitialMount={setInitialMount}
          getOrderRequestList={getOrderRequestList}
        />
      ) : (
        <TableView
          status={ORDER_STATUS.COMPLETED}
          userDetails={userDetails}
          isLoading={isLoading}
          setLoading={setLoading}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          orderRequests={orderRequests}
          rowsPerPage={rowsPerPage}
          handleOrderRequest={handleOrderRequest}
          showTostMessages={showTostMessages}
          getOrderRequestList={getOrderRequestList}
          initialMount={initialMount}
          setInitialMount={setInitialMount}
        />
      )}
    </Box>
  );
}

export default OrdersTable;
