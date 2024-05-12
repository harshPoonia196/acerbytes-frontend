"use client";

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TableSortLabel,
  Chip,
  Button,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";
import Footer from "Components/Footer";
import { capitalLizeName, getComparator, indianNumberingSystem, stableSort } from "utills/CommonFunction";
import { listOfPages } from "Components/NavBar/Links";
import { reactQueryKey } from "utills/Constants";
import { useQueries } from "utills/ReactQueryContext";
import { getEnquiries } from "api/Util.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loader from "Components/CommonLayouts/Loading";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { countryCodeFormating, maskPhoneNumber } from "utills/utills";

function Row(props) {
  const { row, history } = props;
  const [open, setOpen] = React.useState(false);
const handlePropertyView = (link) => {
  const baseUrl = window.location.origin;
  const fullLink = `${baseUrl}/${link}`;
  window.open(fullLink, "_blank");
}
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.project}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>
        {row.propertyLink && (
          <a
            href={row.propertyLink}
            onClick={(e) => {
              e.preventDefault();
              handlePropertyView(row.propertyLink);
            }}
            style={{ textDecoration: "none" }}
          >
            {row?.project ?
              `${capitalLizeName(row?.project)}`
              : "-"}
          </a>
        )}
          </TableCell>
        {/* <TableCell>{row.urgency}</TableCell>
        <TableCell>{row.buyingType}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.enquired}</TableCell>
        <TableCell>{row.consultedBy}</TableCell> */}
        <TableCell>
          <Chip
            label="View contact"
            size="small"
            onClick={() => {
              history.push(listOfPages.consultantJoinNow);
            }}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   {
//     project: "Godrej forest",
//     phone: "+91 97******97",
//     urgency: "High",
//     price: "₹ 120",
//     enquired: "2 days ago",
//     buyingType: 'Investor',
//     consultedBy: 5,
//     location: "Noida, Sector 150",
//     next: "yes",
//   },
//   {
//     project: "Godrej forest",
//     phone: "+91 97******97",
//     urgency: "Low",
//     price: "₹ 120",
//     enquired: "2 days ago",
//     buyingType: 'Buyer',
//     consultedBy: 1,
//     location: "Noida, Sector 150",
//     next: "yes",
//   },
//   {
//     project: "Godrej forest",
//     phone: "+91 97******97",
//     urgency: "Medium",
//     price: "₹ 120",
//     enquired: "2 days ago",
//     buyingType: 'User',
//     consultedBy: 1,
//     location: "Noida, Sector 150",
//     next: "yes",
//   },
// ];

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
    id: "PropertyLink",
    label: "Property link",
  },
  {
    id: "ViewDetails",
    label: "View",
  },
  // {
  //   id: "urgency",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Urgency",
  // },
  // {
  //   id: "buyingType",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Buying type",
  // },
  // {
  //   id: "budget",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Max budget",
  // },
  // {
  //   id: "enquired",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Enquired",
  // },
  // {
  //   id: "consultedBy",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Consulted by",
  // },
  // {
  //   id: "action",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Action",
  // },
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

  const { openSnackbar } = useSnackbar();

  const {
    data: rows,
    isLoading,
    error,
    refetch,
  } = useQueries([reactQueryKey.broker.myLeads], async () => {
    try {
      const response = await getEnquiries();
      if (response.status == 200) {
        const { success, data, message } = response.data;
        if (success) {
          return data?.map((enquiry) => {
            return {
              project: enquiry?.property[0]?.overview?.projectName || "",
              // phone: `+${enquiry.phone?.countryCode} ${enquiry?.broker?.startNumber
              //   }${enquiry?.broker?.numberLength > 2
              //     ? new Array(enquiry?.broker?.numberLength - 1).join("*")
              //     : ""
              //   }`,
              phone: `${countryCodeFormating(enquiry.phone?.countryCode)} ${maskPhoneNumber(enquiry.phone?.number)}`,
              propertyLink: enquiry.propertyLink,
              urgency: "Medium",
              price: enquiry?.property?.unitsPlan?.[0]?.bsp || "",
              enquired: enquiry?.leads?.length || 0,
              buyingType: enquiry?.property?.unitsPlan?.[0]?.propertyType || "",
              consultedBy: enquiry?.property?.consultants?.length || 0,
              // location: `${enquiry?.property[0]?.location?.area} ${enquiry?.property[0]?.location?.sector} ${enquiry?.property[0]?.location?.state} ${enquiry?.property[0]?.location?.city}`,
              location: `${enquiry?.property[0]?.location?.city}`,
              next: "yes",
            };
          });
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
  });

  const history = useRouter();

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ backgroundColor: "white" }}>
        <Container maxWidth="lg" sx={{ pb: "0 !important" }}>
          <Box sx={{ py: 4 }}>
            <Typography variant="h1" sx={{ color: "#000", fontWeight: 300 }}>
              Explore a world of possibilities with{" "}
              <span
                className="urlStyling"
                style={{ color: colors.BLUE, cursor: "pointer" }}
                onClick={() => {
                  history.push(listOfPages.consultantJoinNow);
                }}
              >
                {indianNumberingSystem(rows?.length || 0)}
              </span>{" "}
              open real estate queries. Your next customer is just a click away
            </Typography>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Box sx={{ width: "fit-content", margin: "auto" }}>
                <AvatarGroup total={5}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar
                    alt="Agnes Walker"
                    src="/static/images/avatar/4.jpg"
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                  />
                </AvatarGroup>
              </Box>
              <Typography
                variant="h3"
                sx={{ flex: 1, alignSelf: "center", my: 2 }}
              >
                Be a part of approved consultants community
              </Typography>
              <CustomButton variant="contained" sx={{ alignSelf: 'center' }} onClick={() => { history.push(listOfPages.consultantJoinNow) }}
                ButtonText={"Join as real estate consultant"}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          sx={{
            color: "#000",
            fontSize: "1rem",
            fontWeight: 900,
            lineHeight: 1,
            mb: 2,
          }}
        >
          Leads panel
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table" size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows && Array.isArray(rows) ? (
                rows?.map((row) => (
                  <Row key={row.name} row={row} history={history} />
                ))
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  No Data
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
}
