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
  ListItemIcon,
  Tooltip 
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { capitalLizeName, filterText, getComparator, stableSort, formatNumberWithCommas } from "utills/CommonFunction";
import { useQueries } from "utills/ReactQueryContext";
import { useSnackbar } from "utills/SnackbarContext";
import { getLeads } from "api/Admin.api";
import { LEADS_TAB, LINK, PAGINATION_LIMIT, PAGINATION_LIMIT_OPTIONS, reactQueryKey } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import { countryCodeFormating } from "utills/utills";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
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
    label: "City",
  },
  {
    id: "name",
    label: "Customer",
  },
  {
    id: "phone",
    label: "Phone",
  },
  // {
  //   id: "phoneVerified",
  //   label: "phoneVerified",
  // },
  {
    id: "email",
    label: "Email",
  },
  // {
  //   id: "emailVerified",
  //   label: "email Verified",
  // },
  {
    id: "maxBudget",
    label: "Max budget",
    numeric: true
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
  // {
  //   id: "brokerInfo",
  //   label: "Broker",
  // },
  {
    id: "source",
    label: "Source",
  },
  {
    id: "creditValue",
    label: "Credit value",
    numeric: true
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "enquired date",
    label: "Enquired date",
  },
  {
    id: "action",
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, alignment } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.id !== 'creditValue' || (headCell.id === 'creditValue' && alignment === LEADS_TAB[2].value)) {
            return <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ fontWeight: "bold" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >

                {(headCell.label)}


                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          } else {
            return null
          }
        }
        )}
      </TableRow>
    </TableHead>
  );
}

function RowStructure({ row, handlePropertyView, router, alignment }) {
  const user = row?.user || {};
  const userDetail = row?.userDetail || {};
  console.log("rowsss", row)
  const handleBrokerProfileClick = (googleID) => {
    if (googleID) {
      router.push(listOfPages.adminUpdateConsultantProfileLinks + `/${googleID}`);
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
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
      hover
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f5f5f5"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
    >
      <TableCell>
        {row.propertyLink && (
          <a href="#" style={{ cursor: 'pointer', textDecoration: "none" }}
            onClick={(e) => {
              e.preventDefault();
              handlePropertyView(row.propertyLink);
            }}
          >
            {capitalLizeName(filterText(row?.property?.overview?.builder))} {capitalLizeName(filterText(row?.property?.overview?.projectName))}
          </a>
        )}
      </TableCell>
      <TableCell>{row?.property?.location?.city}</TableCell>
      <TableCell>{row?.name?.firstName} {row?.name?.lastName}</TableCell>

      <TableCell>{countryCodeFormating(row?.phone?.countryCode)} {row?.phone?.number}&nbsp;
        {row.isVerified ? <Tooltip title="Verified"><CheckCircleIcon sx={{ verticalAlign: 'middle', position: 'relative', top: "-1px" }} fontSize="1rem" color='success' /></Tooltip> :
          <Tooltip title="Not Verified"><UnpublishedIcon sx={{ verticalAlign: 'middle', position: 'relative', top: "-1px" }} fontSize="1rem" color='error' /></Tooltip>}
      </TableCell>
      <TableCell>{user.email || "-"}</TableCell>
      {/* <TableCell>{row.emailVerified ? "Yes" : "No"}</TableCell> */}

      <TableCell align="right">{userDetail?.budget?.maximumBudget?.value ? `₹${formatNumberWithCommas(userDetail?.budget?.maximumBudget?.value)}` : "-"}</TableCell>
      {/* <TableCell>{user.role}</TableCell> */}
      {/* <TableCell>{row.brokerId && row?.higherrole?.name?.firstName ? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleBrokerProfileClick(row?.higherrole?.googleID)} >{row?.higherrole?.name?.firstName} {row?.higherrole?.name?.lastName}</span> : "-"}</TableCell> */}
      <TableCell>{row.source}</TableCell>
      {alignment === LEADS_TAB[2].value ? <TableCell align="right">{row?.userDetail?.userCreditValue?.toLocaleString('en-IN')}</TableCell> : null}
     
      <TableCell>{row?.userDetail?.status?.toUpperCase() || "-"}
      </TableCell>
      <TableCell>
        {moment(row.createdAt).format("DD/MM/YY hh:ss A")}
      </TableCell>

      <TableCell sx={{ py: 0 }}>
      <Tooltip title="More">
        <IconButton
          onClick={handleClick}
          disabled={
            !user.email
          }
          sx={{ fontSize: "1rem !important" }}
        >
          <MoreVertIcon fontSize="1rem" />
        </IconButton>
        </Tooltip>
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
            <ListItemIcon><EditIcon fontSize="1"/></ListItemIcon> Edit Profile
          </MenuItem>
        </Menu>
      </TableCell>

      {/* <TableCell>{row.closedStatus}</TableCell>
      // <TableCell>{row.pendingStatus}</TableCell> */}

      {/* <TableCell>{row.updatedBy}</TableCell>
      <TableCell>
        <Chip label={row.lastModified} size="small" />
      </TableCell> */}

    </TableRow>
  );
}

function EnquiriesTable({ search, setCounts, alignment, page, setPage }) {
  const router = useRouter(),
    [order, setOrder] = useState("asc"),
    [orderBy, setOrderBy] = useState(null),
    [rows, setRows] = useState([]),
    [rowsPerPage, setRowsPerPage] = useState(PAGINATION_LIMIT),
    [totalCount, setTotalCount] = useState(0),
    firstLoad = useRef(true),
    { openSnackbar } = useSnackbar(),

    { data, isLoading, error, refetch } = useQueries(
      [reactQueryKey.broker.myLeads],
      async () => {
        try {
          const response = await getLeads({ limit: rowsPerPage, page, search, status: alignment });
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

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  useEffect(() => {
    const records = data?.data ?? [],
      totalCount = data?.totalCount ?? 0,
      leadCounts = data?.leadsCount ?? 0,
      reviewed = data?.reviewed ?? 0,
      pending = data?.pending ?? 0;
    
      console.log(records)

    setRows(records);
    setTotalCount(totalCount);
    setCounts({ leadCounts, pending, reviewed });

  }, [data]);

  useEffect(() => {
    if (!firstLoad.current) {
      refetch();
    }
    firstLoad.current = false;
  }, [rowsPerPage, page, alignment, search]);

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
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                alignment={alignment}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.map((row) => {
                  const { adId = null, brokerId = [], userId = null } = row;
                  if (adId && !!brokerId?.length && userId) {
                    row.source = LINK.unique;
                  } else if (!adId && !!brokerId?.length && userId) {
                    row.source = LINK.consultant;
                  } else if (!adId && !brokerId?.length && userId) {
                    row.source = LINK.acrebytes;
                  }

                  return <RowStructure row={row} key={row.firstName} handlePropertyView={handlePropertyView} router={router} alignment={alignment} />
                })}
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
