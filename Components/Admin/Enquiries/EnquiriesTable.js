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
  Typography,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { capitalLizeName, formatAmount, getComparator, stableSort } from "utills/CommonFunction";
import { useQueries } from "utills/ReactQueryContext";
import { useSnackbar } from "utills/SnackbarContext";
import { getLeads } from "api/Admin.api";
import { PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS, reactQueryKey } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { countryCodeFormating } from "utills/utills";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// const rows = [
//   {
//     firstName: "Anand",
//     lastName: "Gupta",
//     city: "Mumbai",
//     countryCode: "+91",
//     phone: "1234567558",
//     phoneVerified: true,
//     email: "anand@gmail.com",
//     emailVerified: true,
//     role: "Investor",
//     maxBudget: 12000,
//     closedStatus: "Pending",
//     pendingStatus: "Pending",
//     updatedBy: "Anand",
//     lastModified: "12th Nov 2018, 09:18 AM",
//   },
// ];

const headCells = [
  {
    id: "property",
    label: "Property",
  },
  {
    id: "propertyCity",
    label: "city",
  },
  {
    id: "name",
    label: "Customer",
  },
  {
    id: "phone",
    label: "phone",
  },
  // {
  //   id: "phoneVerified",
  //   label: "phoneVerified",
  // },
  {
    id: "email",
    label: "email",
  },
  // {
  //   id: "emailVerified",
  //   label: "email Verified",
  // },
  {
    id: "maxBudget",
    label: "max Budget",
  },
  // {
  //   id: "role",
  //   label: "role",
  // },

  // {
  //   id: "closedStatus",
  //   label: "closed Status",
  // },
  // {
  //   id: "pendingStatus",
  //   label: "pending Status",
  // },
  // {
  //   id: "updatedBy",
  //   label: "updated By",
  // },
  // {
  //   id: "lastModified",
  //   label: "last Modified",
  // },
  {
    id: "brokerInfo",
    label: "Broker",
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

function RowStructure({ row, handlePropertyView, router }) {
  const user = row?.user || {};
  const userDetail = row?.userDetail || {};

  const handleBrokerProfileClick = (googleID) => {
    if (googleID) {
      router.push(listOfPages.adminUpdateConsultantProfileLinks + `/${googleID}`);
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const editProfile = (googleID) => {
    if (googleID) {
      router.push(listOfPages.adminUpdateProfileLinks + `/${googleID}`);
    }
    handleClose();
  }


  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className="urlStylingBackground">
        {row.propertyLink && (
          <a sx={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              handlePropertyView(row.propertyLink);
            }}
          >
            {capitalLizeName(row?.property?.overview?.builder)} {capitalLizeName(row?.property?.overview?.projectName)}
          </a>
        )}
      </TableCell>
      <TableCell>{row?.property?.location?.city}</TableCell>
      <TableCell>{row?.name?.firstName} {row?.name?.lastName}</TableCell>

      <TableCell>{countryCodeFormating(row?.phone?.countryCode)} {row?.phone?.number}&nbsp;
        {row.isVerified && <CheckCircleIcon sx={{ verticalAlign: 'middle' }} fontSize="1rem" color='success' />}</TableCell>
      <TableCell>{user.email || "-"}</TableCell>
      {/* <TableCell>{row.emailVerified ? "Yes" : "No"}</TableCell> */}

      <TableCell>{userDetail?.budget?.maximumBudget?.value ? `₹${userDetail?.budget?.maximumBudget?.value}` : "-"}</TableCell>
      {/* <TableCell>{user.role}</TableCell> */}
      <TableCell>{row.brokerId && row?.higherrole?.name?.firstName ? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleBrokerProfileClick(row?.higherrole?.googleID)} >{row?.higherrole?.name?.firstName} {row?.higherrole?.name?.lastName}</span> : "-"}</TableCell>
      <TableCell sx={{ py: 0 }}>
        <IconButton
          onClick={handleClick}
          disabled={
            !user.email
          }
          sx={{ fontSize: "1rem !important" }}
        >
          <MoreVertIcon fontSize="1rem" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            '& .MuiList-root': {
              padding: '0px',
            },
          }}
        >
          <MenuItem onClick={() => editProfile(row?.user?.googleID)} >
            Edit Profile
          </MenuItem>
        </Menu>
      </TableCell>


      {/* <TableCell>{row.closedStatus}</TableCell>
      <TableCell>{row.pendingStatus}</TableCell> */}

      {/* <TableCell>{row.updatedBy}</TableCell>
      <TableCell>
        <Chip label={row.lastModified} size="small" />
      </TableCell> */}

    </TableRow>
  );
}

function EnquiriesTable({ search, setLeadsCount }) {
  const router = useRouter();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGINATION_LIMIT);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const firstLoad = React.useRef(true);

  const { openSnackbar } = useSnackbar();

  const { data, isLoading, error, refetch } = useQueries(
    [search, reactQueryKey.broker.myLeads],
    async () => {
      try {
        const response = await getLeads({ limit: rowsPerPage, page, search });
        if (response.status == 200) {
          const { success, data, message } = response.data;
          if (success) {
            return data;
          } else {
            openSnackbar(message, "error");
          }
        }
      } catch (error) {
        openSnackbar(
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!",
          "error"
        );
        return error;
      }
    }
  );
  console.log("DATA: ", data);

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

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  React.useEffect(() => {
    setRows(data?.data || []);
    setTotalCount(data?.totalCount || 0);
    setLeadsCount(data?.leadsCount || 0);
  }, [data]);

  React.useEffect(() => {
    if (!firstLoad.current) {
      refetch();
    }
    firstLoad.current = false;
  }, [rowsPerPage, page]);

  const handlePropertyView = (link) => {
    const baseUrl = window.location.origin;
    const fullLink = `${baseUrl}/${link}`;
    window.open(fullLink, "_blank");
  }

  return (
    <>
      {isLoading ? <Loader /> : null}
      {
        rows.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.map((row) => (
                  <RowStructure row={row} key={row.firstName} handlePropertyView={handlePropertyView} router={router} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                overflow: "hidden",
              }}
              rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) :
          <NoDataCard title={"No data found"} />
      }

    </>
  );
}

export default EnquiriesTable;
