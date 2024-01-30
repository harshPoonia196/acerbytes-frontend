import {
  Table,
  Box,
  TableBody,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "utills/CommonFunction";
import {
  getUsersList,
  updateUserRole,
  updateUserStatus,
} from "api/ManageUser.api";
import { useSnackbar } from "utills/SnackbarContext";
import {
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
  ROLES,
  ROLE_CONSTANTS,
} from "Components/config/config";
import Loading from "Components/CommonLayouts/Loading";
import ConfirmationDialog from "Components/CommonLayouts/ConfirmationDialog";
import { matchUserRole } from "utills/utills";
import { useAuth } from "utills/AuthContext";

const headCells = [
  {
    id: "name",
    label: "Consultant name",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: "Role",
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
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

const RoleViewer = ({ role, userDetails, updateRole }) => {
  const handleChange = (event) => {
    updateRole(event.target.value);
  };

  return (
    <FormControl size="small" variant="standard">
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={role}
        onChange={handleChange}
        label="Select role"
        disabled={
          !(
            matchUserRole(userDetails?.role, ROLE_CONSTANTS.admin) ||
            matchUserRole(userDetails?.role, ROLE_CONSTANTS.superAdmin)
          )
        }
      >
        {ROLES?.filter((rs) => rs.isVisible)?.map((rs) => {
          return <MenuItem value={rs.value}>{rs.label}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

function RowStructure({ row, userDetails, updateRole, handleUpdateStatus }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = (googleID, status) => {
    handleClose();
    handleUpdateStatus(googleID, status);
  };

  return (
    <TableRow
      key={row.name}
      style={row.isBlocked ? { backgroundColor: "#dcc4c4" } : null}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        {row?.name?.firstName} {row?.name?.lastName}
      </TableCell>
      <TableCell>
        {row?.phone?.countryCode} {row?.phone?.number}
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        <RoleViewer
          role={row.role}
          userDetails={userDetails}
          updateRole={(newRole) => updateRole(row.googleID, newRole)}
        />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton
          disabled={!matchUserRole(userDetails?.role, ROLE_CONSTANTS.admin)}
          sx={{ fontSize: "1rem !important" }}
        >
          <MoreVertIcon onClick={handleClick} fontSize="1rem" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {row.isBlocked ? (
            <MenuItem onClick={() => updateStatus(row.googleID, false)}>
              Unblock
            </MenuItem>
          ) : (
            <MenuItem onClick={() => updateStatus(row.googleID, true)}>
              Block
            </MenuItem>
          )}
        </Menu>
      </TableCell>
    </TableRow>
  );
}

function ManageUserTable({ searchText }) {
  const { userDetails } = useAuth();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(PAGINATION_LIMIT);
  const [initialMount, setInitialMount] = React.useState(true);
  const [usersList, setUsersList] = React.useState({
    list: [],
    totalCount: 0,
    totalPages: 0,
    nextPage: 0,
    prevPage: 0,
  });
  const [confirmationDialog, setConfirmationDialog] = React.useState({
    isOpen: false,
    data: {},
  });
  const [statusConfirmationDialog, setStatusConfirmationDialog] =
    React.useState({
      isOpen: false,
      data: {},
    });

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  React.useEffect(() => {
    // This block will run only on initial mount
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    const pageOptions = {
      pageLimit,
      page: currentPage,
    };
    getAllUsersList(pageOptions, searchText);
    // Add a cleanup function if necessary
    return () => {
      // Your cleanup code here, if needed
    };
  }, [searchText, initialMount]);

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");

    return queryString;
  };

  const getAllUsersList = async (pageOptions, searchText) => {
    try {
      const querParams = {
        ...pageOptions,
        firstName: searchText,
        lastName: searchText,
        role: searchText,
      };
      setLoading(true);
      const response = await getUsersList(objectToQueryString(querParams));
      if (response.status == 200) {
        setUsersList({
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
          "Error get Users list",
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
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getAllUsersList(pageOptions, searchText);
  };

  const handleChangeRowsPerPage = (event) => {
    const pageLimit = parseInt(event.target.value, 10);
    setPageLimit(pageLimit);
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getAllUsersList(pageOptions, searchText);
  };

  const updateRole = async (googleID, role) => {
    setConfirmationDialog({
      isOpen: true,
      data: {
        userId: googleID,
        role,
      },
    });
  };

  const handleUpdateStatus = async (googleID, isBlocked) => {
    setStatusConfirmationDialog({
      isOpen: true,
      data: {
        userId: googleID,
        isBlocked,
      },
    });
  };

  const handleDialogAction = async (action) => {
    if (action) {
      // Call api
      try {
        const payload = confirmationDialog.data;
        setConfirmationDialog({
          isOpen: false,
          data: {},
        });

        setLoading(true);
        const response = await updateUserRole(payload);
        if (response.status == 200) {
          const pageOptions = {
            pageLimit,
            page: currentPage,
          };
          getAllUsersList(pageOptions, searchText);
        }
      } catch (error) {
        showToaterMessages(
          error?.response?.data?.message ||
            error?.message ||
            "Error update role",
          "error"
        );
      } finally {
        setLoading(false);
      }
    } else {
      setConfirmationDialog({
        isOpen: false,
        data: {},
      });
    }
  };

  const handleStatusDialogAction = async (action) => {
    if (action) {
      // Call api
      try {
        const payload = statusConfirmationDialog.data;
        setStatusConfirmationDialog({
          isOpen: false,
          data: {},
        });

        setLoading(true);
        const response = await updateUserStatus(payload);
        if (response.status == 200) {
          const pageOptions = {
            pageLimit,
            page: currentPage,
          };
          getAllUsersList(pageOptions, searchText);
        }
      } catch (error) {
        showToaterMessages(
          error?.response?.data?.message ||
            error?.message ||
            "Error update status",
          "error"
        );
      } finally {
        setLoading(false);
      }
    } else {
      setStatusConfirmationDialog({
        isOpen: false,
        data: {},
      });
    }
  };

  return (
    <>
      <ConfirmationDialog
        id="ringtone-menu"
        keepMounted
        open={confirmationDialog.isOpen}
        handleAction={handleDialogAction}
      />
      <ConfirmationDialog
        id="ringtone-menu"
        keepMounted
        open={statusConfirmationDialog.isOpen}
        handleAction={handleStatusDialogAction}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {isLoading ? (
              <Loading />
            ) : (
              usersList?.list?.map((row) => (
                <RowStructure
                  row={row}
                  userDetails={userDetails}
                  updateRole={updateRole}
                  handleUpdateStatus={handleUpdateStatus}
                />
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
          component="div"
          count={usersList?.totalCount}
          rowsPerPage={pageLimit}
          page={currentPage - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default ManageUserTable;
