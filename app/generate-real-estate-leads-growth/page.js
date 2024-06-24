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
  Grid,
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";
import Footer from "Components/Footer";
import {
  capitalLizeName,
  getComparator,
  indianNumberingSystem,
  stableSort,
} from "utills/CommonFunction";
import { listOfPages } from "Components/NavBar/Links";
import { reactQueryKey } from "utills/Constants";
import { useQueries } from "utills/ReactQueryContext";
import { getEnquiries } from "api/Util.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loader from "Components/CommonLayouts/Loading";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { countryCodeFormating, maskPhoneNumber } from "utills/utills";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { useAuth } from "utills/AuthContext";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import Marketing from "public/images/marketing.jpg";
import Offer from "Components/Marketing/Offer";
import NavTabProfilePage from "Components/ProfilePage/NavTabProfilePage";
import {listOfMarketingTab} from "utills/Constants";
import throttle from "lodash/throttle";
import FAQ from "Components/Marketing/FAQ";

const enquiries = [
  {
    id: "1",
    title: "Lead generation link",
    description:
      "Get own property page linked with your contact, receive unlimited inquiries",
    image:
      "https://www.kundans.com/wp-content/uploads/2023/02/property-purchasing-1024x640.jpg",
  },
  {
    id: "2",
    title: "Lead inquiries management",
    description: "Get paanel to manage your client status and notes",
    image:
      "https://kathygroverrealestateagenthighlandvillagetx.com/wp-content/uploads/2019/10/Property-Business0.jpg",
  },
  {
    id: "3",
    title: "Increase your presence and visibility",
    description: "Get your profile linked to listed property",
    image:
      "https://www.businessinsider.in/_next/image?url=https%3A%2F%2Fstaticbiassets.in%2Fthumb%2Fmsid-52322577%2Cwidth-700%2Cresizemode-4%2Cimgsize-135930%2Findian-property-sector-uprise.jpg&w=1920&q=75",
  },
  {
    id: "4",
    title: "Access active and verified customer enquiries",
    description: "improve your chances of leads conversion with better leads",
    image:
      "https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2022/05/real-estate-business-ideas-850x476.png?ezimgfmt=ng%3Awebp%2Fngcb12",
  },
];

function Row(props) {
  const { row, history } = props;

  const [open, setOpen] = React.useState(false);
  const handlePropertyView = (link) => {
    const baseUrl = window.location.origin;
    const fullLink = `${baseUrl}/${link}`;
    window.open(fullLink, "_blank");
  };
  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.project}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>
          {row.phone}{" "}
          {row.isVerified ? (
            <CheckCircleIcon
              sx={{
                verticalAlign: "middle",
                position: "relative",
                top: "-1px",
              }}
              fontSize="1rem"
              color="success"
            />
          ) : (
            <UnpublishedIcon
              sx={{
                verticalAlign: "middle",
                position: "relative",
                top: "-1px",
              }}
              fontSize="1rem"
              color="error"
            />
          )}
        </TableCell>
        <TableCell>
          {row.propertyLink && (
            <>
              <a
                href={row.propertyLink}
                onClick={(e) => {
                  e.preventDefault();
                  handlePropertyView(row.propertyLink);
                }}
                style={{ textDecoration: "none" }}
              >
                {row?.project ? `${capitalLizeName(row?.project)}` : "-"}
              </a>
              {row.brokerId?.length > 0 ? (
                <Tooltip title="Home">
                  <HomeIcon
                    sx={{
                      fontSize: "14px",
                      position: "relative",
                      top: "2px",
                      left: "3px",
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Agent">
                  <SupportAgentIcon
                    sx={{
                      fontSize: "14px",
                      position: "relative",
                      top: "2px",
                      left: "3px",
                    }}
                  />
                </Tooltip>
              )}
            </>
          )}
        </TableCell>

        <TableCell>{row.urgency}</TableCell>
        <TableCell>budget</TableCell>
        <TableCell>purchase</TableCell>
        {/* <TableCell>{row.buyingType}</TableCell>
        <TableCell>{row.price}</TableCell>
    
        <TableCell>{row.consultedBy}</TableCell> */}
        <TableCell>
          <a
            href={"consultant/suggested-leads"}
            onClick={() => {
              history.push(listOfPages.suggestedLeads);
            }}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <LocalPhoneIcon
              fontSize="1rem"
              sx={{ mr: "0.1rem", position: "relative", top: "2px" }}
            />
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
    id: "urgency",
    numeric: true,
    disablePadding: false,
    label: "Urgency",
  },
  {
    id: "budget",
    numeric: true,
    disablePadding: false,
    label: "Budget",
  },
  {
    id: "purpose_of_purchase",
    numeric: true,
    disablePadding: false,
    label: "Purpose of purchase",
  },
  {
    id: "ViewDetails",
    label: "View",
  },

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
              <Typography
                variant="body2"
                sx={{ fontWeight: "800" }}
              >
                {headCell.label}
              </Typography>

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

const EnquiryCard = ({ enquiry }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardMedia
          sx={{ height: 140 }}
          image={enquiry.image}
          title={enquiry.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
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
  );
};

export default function Enquiries(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const { userDetails } = useAuth();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const { brokerBalance } = useAuth();

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
              phone: `${countryCodeFormating(enquiry.phone?.countryCode)} ${
                enquiry.phone?.number
              }********`,
              propertyLink: enquiry.propertyLink,
              urgency: "Medium",
              price: enquiry?.property?.unitsPlan?.[0]?.bsp || "",
              enquired: enquiry?.leads?.length || 0,
              buyingType: enquiry?.property?.unitsPlan?.[0]?.propertyType || "",
              consultedBy: enquiry?.property?.consultants?.length || 0,
              // location: `${enquiry?.property[0]?.location?.area} ${enquiry?.property[0]?.location?.sector} ${enquiry?.property[0]?.location?.state} ${enquiry?.property[0]?.location?.city}`,
              location: `${enquiry?.property[0]?.location?.city}`,
              next: "yes",
              brokerId: enquiry?.brokerId,
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
  console.log(props, "userdjbdj");

  const tabHeight = 116;
  
  const [activeState, setActiveState] = React.useState("whatWeDo");

  let itemsServer = listOfMarketingTab.map((tab) => {
    const hash = tab.value;
    return {
      text: tab.label,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);

  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
        document.documentElement.scrollTop +
        document.documentElement.clientHeight / 8 +
        tabHeight
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the  scrolls due to a clickpage
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);

      if (window)
        window.scrollTo({
          top:
            document.getElementById(hash)?.getBoundingClientRect().top +
            window.pageYOffset -
            tabHeight,
          behavior: "smooth",
        });
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  const noop = () => { };

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) return undefined;

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}




  return (
    <>
      {isLoading && <Loader />}
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "-1px -2px 6px 2px gainsboro !important",
        }}
      >
        <Card sx={{ background: "#e2b42d", borderRadius: 0}}>
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{color: 'white', textShadow: "0 0 10px rgba(0, 0, 0, .3)", textAlign: "center"}}>Improve your Real estate conversions, significantly improve your real estate Sales</Typography>
          </Container>
        </Card>
        <Card sx={{ position: "relative",borderRadius: 0 }}>
          <CardMedia
            sx={{ height: 500 }}
            image={Marketing.src}
            title="green iguana"
          />
          <Box sx={{ color: colors.WHITE, zIndex: 1, textAlign: "center", position: 'absolute', top: "50%", left: "50%", width: "100%", transform: "translate(-50%, -50%)"}}>
            <Container sx={{p: "0 !important"}}>
              {/* <Typography variant="h5" sx={{color: 'white', textShadow: "0 0 10px rgba(0, 0, 0, .3)"}}>Are you a real estate consultant ? </Typography>
              <Typography variant="h2" fontWeight="bold" sx={{color: 'white', textShadow: "0 0 10px rgba(0, 0, 0, .3)"}}>Get an easy way to generate real estate leads and business growth with AcreBytes</Typography> */}
              <Typography
              variant="h1"
              className="marketingTitle"
              sx={{
                fontWeight: 300,
                
                marginBottom: "35px",
                textAlign: "center",
                color: 'white'
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                Are you a real estate consultant ?{" "}
              </span>
              Get an easy way to generate real estate leads and business
              growth with AcreBytes
            </Typography>
            </Container>
          </Box>
          <Box className="overlay"></Box>
        </Card>
        <Box className="marketTabs" sx={{backgroundColor:"#fff", position: "sticky", top: {xs: '54px', sm: '64px'}, left: 0, right: 0, zIndex: 100, boxShadow: '-1px 8px 6px -6px gainsboro'}}>
          <NavTabProfilePage
            value={activeState}
            handleChange={handleClick}
            list={itemsServer}
          />
        </Box>
        <Box id="whatWeDo">
          <Container maxWidth="lg">
            <Box sx={{padding:5}}>
              <Typography variant="h2" sx={{ textAlign: "center"}}>What we do</Typography>
              <Typography variant="body1" sx={{ textAlign: "center", mt: 1}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
            </Box>
          </Container>
        </Box>
        <Box id="offerDetails">
          <Typography variant="h2" sx={{ textAlign: "center"}}>What we offer</Typography>
          <Offer />
        </Box>
        <Box id="faq" sx={{marginTop: "20px"}}>
          <Typography variant="h2" sx={{ textAlign: "center"}}>FAQ</Typography>
          <FAQ />
        </Box>
        {/* <Box id="benefits">
          <Container maxWidth="lg">
            <Typography variant="h2" sx={{ textAlign: "center"}}>Benefits</Typography>
          </Container>
        </Box> */}
        <Container maxWidth="lg" sx={{ pb: "0 !important" }}>
          <Box sx={{ py: 2 }}>
            
            <Grid container spacing={2}>
              {enquiries.map((enquiry) => {
                return (
                  <Grid item xs={12} sm={6} lg={3}>
                    <EnquiryCard key={enquiry.id} enquiry={enquiry} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box sx={{ py: 4 }}>
            {/* <Typography variant="h1" sx={{ color: "#000", fontWeight: 300 }}>
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
            </Typography> */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              {/* <Box sx={{ width: "fit-content", margin: "auto" }}>
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
              </Box> */}
              {/* <Typography
                variant="h3"
                sx={{ flex: 1, alignSelf: "center", my: 2 }}
              >
                View  my {rows?.length} leads
              </Typography> */}
            </Box>
          </Box>
        </Container>
      </Box>
      {/* <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#000",
              fontSize: "1rem",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            Leads panel
          </Typography>
          <Box>
            {userDetails.role === "broker" && (
              <>
                <CustomButton
                  variant="contained"
                  sx={{ alignSelf: "center" }}
                  onClick={() => {
                    history.push(listOfPages.suggestedLeads);
                  }}
                  ButtonText={"View suggested leads"}
                />

                {brokerBalance ? (
                  <CustomButton
                    variant="contained"
                    sx={{ alignSelf: "center", margin: "0.3rem" }}
                    ButtonText={`Points: ${brokerBalance}`}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            // padding: "10px",
            // border: "1px solid #ccc"
          }}
        >
          <Table size="small" aria-label="collapsible table">
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
                // <Typography variant="body2" style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                //   No Data
                // </Typography>
                <Box>
                  <NoDataCard title={"No data found"} sx={{ width: "100%" }} />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container> */}
      <div style={{ paddingBottom: "70px" }}></div>
      <Footer />
    </>
  );
}
