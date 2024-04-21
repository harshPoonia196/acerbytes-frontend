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
  IconButton,
  Container,
  Card,
  Menu,
  MenuItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { visuallyHidden } from "@mui/utils";
import { getComparator, stableSort } from "utills/CommonFunction";
import AddCreditPopup from "./Modal/AddCreditPopup";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import { getBrokersList } from "api/Admin.api";
import { debounce } from "lodash";
import {
  ROLE_CONSTANTS, DEBOUNCE_TIMER
} from "utills/Constants";

const headCells = [
  {
    id: "FirstName",
    label: "First name",
  },
  {
    id: "LastName",
    label: "Last name",
  },
  {
    id: "CompanyName",
    label: "Company name",
  },
  {
    id: "phone",
    label: "Phone",
  },

  {
    id: "RERANumber",
    label: "RERA #",
  },
  {
    id: "NoOfActiveLinks",
    label: "No of active links",
  },
  {
    id: "CreditAmount",
    label: "Credit amount",
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

function RowStructure({ row, router }) {
  const [openAddCredit, setOpenAddCredit] = useState(false),
    [anchorEl, setAnchorEl] = React.useState(null),
    open = Boolean(anchorEl),

    handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    },

    handleClose = () => {
      setAnchorEl(null);
    },

    handleOpenAddCreditPopup = () => {
      handleClose();
      setOpenAddCredit(true);
    },

    handleCloseAddCreditPopup = () => {
      setOpenAddCredit(false);
    },

    editProfile = (googleID, role) => {
      if (role == ROLE_CONSTANTS.broker) {
        router.push(listOfPages.adminUpdateConsultantProfileLinks + `/${googleID}`);
      }
      handleClose();
    }


  return (
    <>
      <AddCreditPopup
        open={openAddCredit}
        handleClose={handleCloseAddCreditPopup}
      />
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{row?.name.firstName}</TableCell>
        <TableCell>{row?.name.lastName}</TableCell>
        <TableCell>{row?.serviceDetails?.company || ''}</TableCell>
        <TableCell>{row?.phone?.countryCode + row?.phone?.number}</TableCell>
        <TableCell>{row?.serviceDetails?.reraNumber || ''}</TableCell>
        <TableCell>{row?.totalLinks || 0}</TableCell>
        <TableCell>{row?.brokerBalance?.balance || 0}</TableCell>
        <TableCell>
          <IconButton
            onClick={handleClick}
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
            <MenuItem onClick={handleOpenAddCreditPopup}>
              Add Credit
            </MenuItem>

            <MenuItem onClick={() => editProfile(row?.brokerBalance?.googleID, 'broker')} >
              Edit Profile
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    </>
  );
}

function ManageConsultantTable() {
  const router = useRouter();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [consultantList, setConsultantList] = React.useState({ rows: [], totalCount: 0 });
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [initialMount, setInitialMount] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getList()
  }, [rowsPerPage, page])

  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const getList = async () => {
    const { data: { data: { data, totalCount } }, status } = await getBrokersList(rowsPerPage, page, searchTerm)
    if (status) {
      setConsultantList({ rows: data, totalCount })
    }
  }

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

  function performSearch() {
    getList()
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };


  return (
    <>
      <InfoBox
        dataList={[{ label: 'Consultants', value: consultantList.totalCount }]}
      />

      <Container>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={searchTerm}
            onChange={handleSearch}
          />
        </Card>

        {!!consultantList.rows.length ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {consultantList.rows.map((row) => (
                  <RowStructure row={row} router={router} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                overflow: "hidden",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={consultantList.totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <NoDataCard title={"No data found"} />
        )}
      </Container>
    </>
  );
}

export default ManageConsultantTable;
