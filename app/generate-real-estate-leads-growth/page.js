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
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid 
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { useAuth } from 'utills/AuthContext';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import Qrimage from "../../public/images/demo.webp"

const enquiries = [
  {
    id: "1",
    title: "Lead generation link",
    description: "Get own property page linked with your contact, receive unlimited inquiries",
    image: "https://www.kundans.com/wp-content/uploads/2023/02/property-purchasing-1024x640.jpg"
  },
  {
    id: "2",
    title: "Lead inquiries management",
    description: "Get paanel to manage your client status and notes",
    image: "https://kathygroverrealestateagenthighlandvillagetx.com/wp-content/uploads/2019/10/Property-Business0.jpg"
  },
  {
    id: "3",
    title: "Increase your presence and visibility",
    description: "Get your profile linked to listed property",
    image: "https://www.businessinsider.in/_next/image?url=https%3A%2F%2Fstaticbiassets.in%2Fthumb%2Fmsid-52322577%2Cwidth-700%2Cresizemode-4%2Cimgsize-135930%2Findian-property-sector-uprise.jpg&w=1920&q=75"
  },
  {
    id: "4",
    title: "Access active and verified customer enquiries",
    description: "improve your chances of leads conversion with better leads",
    image: "https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2022/05/real-estate-business-ideas-850x476.png?ezimgfmt=ng%3Awebp%2Fngcb12"
  }
]

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
        <TableCell>{row.phone} {row.isVerified ? <CheckCircleIcon sx={{ verticalAlign: 'middle' }} fontSize="1rem" color='success' /> :
          <UnpublishedIcon sx={{ verticalAlign: 'middle' }} fontSize="1rem" color='error' />}</TableCell>
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
    
        <TableCell>{row.consultedBy}</TableCell> */}
        <TableCell>

          <a
            href={"consultant/suggested-leads"}
            onClick={() => {
              history.push(listOfPages.suggestedLeads);
            }}
            style={{ textDecoration: "none", }}
          > <LocalPhoneIcon fontSize="1rem" sx={{ mr: "0.1rem" }} />
            View contact


          </a>


        </TableCell>
        <TableCell>{row.enquired}</TableCell>
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
  {
    id: "enquired",
    numeric: true,
    disablePadding: false,
    label: "Enquired On date",
  },
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
              <Typography variant="caption" sx={{ textTransform: "capitalize" ,fontWeight: "bold" }}
              >{capitalLizeName(headCell.label)}</Typography>

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

const EnquiryCard = ({enquiry}) => {
  return(
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Box>
        <CardMedia
          sx={{ height: 140 }}
          image={enquiry.image}
          title={enquiry.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold"}}>
            {enquiry.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {enquiry.description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default function Enquiries(props) {

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const { brokerBalance } =
    useAuth();
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
              isVerified: enquiry?.isVerified || false,
              project: enquiry?.property[0]?.overview?.projectName || "",
              // phone: `+${enquiry.phone?.countryCode} ${enquiry?.broker?.startNumber
              //   }${enquiry?.broker?.numberLength > 2
              //     ? new Array(enquiry?.broker?.numberLength - 1).join("*")
              //     : ""
              //   }`,
              phone: `${countryCodeFormating(enquiry.phone?.countryCode)} ${enquiry.phone?.number}********`,
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
  console.log(props, "userdjbdj")

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ backgroundColor: "white", boxShadow: "-1px -2px 6px 2px gainsboro !important", }} >
        <Container maxWidth="lg" sx={{ pb: "0 !important" }} >
          <Box sx={{ py: 2 }}>
            <Typography variant="h1" sx={{
              fontWeight: 300,
              fontSize: { sm: "2em !important", md: "4rem !important" },
              marginBottom: "35px", textAlign: "center"
            }}>
            <span style={{ color: colors.GRAY, fontWeight: "bold" }}>AcreBytes | Are you a real estate consultant ? </span>
            Get an easy way to generate real estate leads and business growth with AcreBytes
            </Typography>
            <Grid container spacing={2}>
              {enquiries.map(enquiry => {
                return (
                  <Grid item xs={12} sm={6} lg={3}>
                    <EnquiryCard key={enquiry.id} enquiry={enquiry} />
                  </Grid>
                )
              })}
          </Grid>
          </Box>
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
                View  my {rows?.length} leads
              </Typography>
              <CustomButton variant="contained" sx={{ alignSelf: 'center', }} onClick={() => { history.push(listOfPages.suggestedLeads) }}
                ButtonText={"View suggested leads"}
              />
              {brokerBalance?
              <CustomButton variant="contained" sx={{ alignSelf: 'center', margin: "0.3rem" }}
                ButtonText={`Points: ${brokerBalance}`}
              />:""}
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" >
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
        <TableContainer component={Paper} style={{
          maxHeight: "350px",
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc"
        }} >
          <Table aria-label="collapsible table" size="small" >
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
                <Typography variant="body2" style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                  No Data
                </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div style={{ paddingBottom: "70px" }} ></div>
      <Footer />
    </>
  );
}
