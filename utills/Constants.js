import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import colors from "styles/theme/colors";
export const boxShadowTop = '-1px -2px 6px 2px gainsboro !important';
export const boxShadowBottom = '1px 2px 2px -2px gainsboro !important';
export const menuMaxHeight = 150;
export const FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const PAGINATION_LIMIT = 10;
export const PAGINATION_LIMIT_OPTIONS = [10, 25];
export const DEBOUNCE_TIMER = 500;

export const ROLE_CONSTANTS = {
  superAdmin: "superAdmin",
  admin: "admin",
  user: "user",
  broker: "broker",
};

export const ROLES = [
  {
    label: "Super Admin",
    value: "superAdmin",
    isVisible: false,
  },
  {
    label: "Admin",
    value: "admin",
    isVisible: true,
  },
  {
    label: "User",
    value: "user",
    isVisible: true,
  },
  {
    label: "Broker",
    value: "broker",
    isVisible: true,
  },
  {
    label: "Customer Support",
    value: "customerSupport",
    isVisible: true,
  },
  {
    label: "Sales",
    value: "sales",
    isVisible: true,
  },
];

export const countries = [
  {
    value: "91",
    label: "+91",
  },
  {
    value: "92",
    label: "+92",
  },
  {
    value: "9528",
    label: "+9528",
  },
  {
    value: "1",
    label: "+1",
  },
];

export const currencies = [
  {
    value: "₹INR",
    label: "₹",
  },
  {
    value: "USD",
    label: "$",
  },
];

export const COUNTRY_NAME = "India";

export const ToasterMessages = {
  PROFILE_UPDATE_SUCCESS: "Profile updated succesfully!",
  ORDER_REQUESTED_SUCCESS: "Order requested succesfully!",
  ORDER_COMPLETED_SUCCESS: "Order completed succesfully!",
  LINK_COPIED_SUCCESS: "Link copied to clipboard succesfully!",
  ROLE_UPDATE_SUCCESS: "Role updated succesfully!",
};

export const BuyingCreditPoints = [
  {
    amount: 25000,
    point: 25000,
    discount: 0,
  },
  {
    amount: 40000,
    point: 50000,
    discount: 20,
  },
  {
    amount: 70000,
    point: 100000,
    discount: 30,
  },
];

export const ORDER_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
};

export const interestedForLoan = [
  {
    label: "Yes",
    value: "YES",
  },
  {
    label: "No",
    value: "NO",
  },
];

export const addressType = [
  {
    label: "Owned",
    value: "OWNED",
  },
  {
    label: "Rented",
    value: "RENTED",
  },
];

export const demographic = [
  {
    label: "Family",
    value: "FAMILY",
  },
  {
    label: "Single",
    value: "SINGLE",
  },
];

export const purpose = [
  {
    label: "Buyer",
    value: "BUYER",
  },
  {
    label: "Investor",
    value: "INVESTOR",
  },
  {
    label: "Both",
    value: "BOTH",
  },
];

export const purchase = [
  {
    label: "First",
    value: "FIRST",
  },
  {
    label: "Second",
    value: "SECOND",
  },
  {
    label: "Third",
    value: "THIRD",
  },
];

export const exploringAs = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Passive",
    value: "PASSIVE",
  },
  {
    label: "Urgent",
    value: "URGENT",
  },
  {
    label: "NA",
    value: "NA",
  },
];

export const SERVICE_TYPE = [
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Government",
    value: "government",
  },
  {
    label: "Business Owner",
    value: "businessOwner",
  },
];

export const FAMILY = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
];

const listOfTabsInAddProperty = [
  {
    label: "Overview",
    value: "project",
  },
  {
    label: "Regulatory clearance",
    value: "regulatory",
  },
  {
    label: "Layout",
    value: "landscape",
  },
  {
    label: "Units plan",
    value: "floorplans",
  },
  {
    label: "Amenities",
    value: "facilities",
  },
  {
    label: "Location",
    value: "location",
  },
  {
    label: "Resale price",
    value: "resalePrice",
  },
  {
    label: "Builder price",
    value: "builderPrice",
  },
  {
    label: "Value for money",
    value: "investment",
  },
  {
    label: "Property consultants",
    value: "propertyConsultants",
  },
  {
    label: "Overall assessment",
    value: "overallAssessment",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
];

const disablePersonalizeAdsOption = [
  "For this page",
  "For 1 week",
  "For 1 month",
  "Disable (can enable later)",
];

const listOfProfileTab = [
  { label: "User details", value: "userDetails" },
  { label: "Work details", value: "serviceDetails" },
  { label: "Interested cities", value: "interestedCities" },
  { label: "Searching for", value: "budget" },
  // { label: 'Enquiries', value: 'enquiries' },
  // { label: 'Property Consultants', value: 'propertyConsultants' },
  { label: "Current address", value: "currentAddress" },
  { label: "Settings", value: "setting" },
];

const listOfConsultantProfileTab = [
  { label: "User details", value: "userDetails" },
  { label: "Service details", value: "serviceDetails" },
  { label: "Target Customers", value: "targetedCustomers" },
  { label: "Budget", value: "budget" },
  // { label: 'Enquiries', value: 'enquiries' },
  // { label: 'Property Consultants', value: 'propertyConsultants' },
  // { label: 'Current address', value: 'currentAddress' },
  { label: "Setting", value: "setting" },
];

const listOfPropertyDetailsTab = [
  {
    label: "Project",
    value: "project",
  },
  {
    label: "Overview",
    value: "builder",
  },
  {
    label: "Regulatory info",
    value: "clearance",
  },
  {
    label: "Layout",
    value: "layout",
  },
  {
    label: "Units plan",
    value: "unitsPlan",
  },
  {
    label: "Amenities",
    value: "amenities",
  },
  {
    label: "Location",
    value: "location",
  },
  {
    label: "Pricing",
    value: "pricing",
  },
  {
    label: "Value for money",
    value: "value",
  },
  {
    label: "Property consultants",
    value: "propertyConsultants",
  },
  {
    label: "Assesment",
    value: "assesment",
  },
];

const reactQueryKey = {
  broker: {
    profile: (uniqueKey) => "broker-profile-" + uniqueKey,
    myLeads: "broker-leads"
  },
  user: {
    myConsultant: "my-consultant",
  },
};

const enquiryFormKey = "enquiryForm";
const enquiryFormOpen = "enquiryFormOpen";
const propertyRedirectKey = "propertyRedirect";

export {
  listOfTabsInAddProperty,
  listOfConsultantProfileTab,
  listOfProfileTab,
  disablePersonalizeAdsOption,
  listOfPropertyDetailsTab,
  reactQueryKey,
  enquiryFormKey,
  enquiryFormOpen,
  propertyRedirectKey,
};

export const generateContent = () => (
  <>
    <Typography variant="body1">
      Unless otherwise specified, the capitalized terms shall have the meanings
      set out below:
    </Typography>
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemIcon
          sx={{ minWidth: "0px", mr: "0.5rem" }}
        >
          <FiberManualRecord
            fontSize="1rem"
            sx={{ color: colors.BLACK }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body1">
            <b>Account</b> - means and includes the account created on the Site,
            by the User, in accordance with the terms of the Agreement,
            registered with and approved by NoBroker.
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon
          sx={{ minWidth: "0px", mr: "0.5rem" }}
        >
          <FiberManualRecord
            fontSize="1rem"
            sx={{ color: colors.BLACK }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body1">
            <b>Agreement</b> - means and includes the Terms and Conditions,
            Privacy Policy, and any other such terms and conditions that may be
            mutually agreed upon between NoBroker and the User in relation to
            the Services.
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon
          sx={{ minWidth: "0px", mr: "0.5rem" }}
        >
          <FiberManualRecord
            fontSize="1rem"
            sx={{ color: colors.BLACK }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2">
            <b>Applicable Law</b> - means and includes any statute, law,
            regulation, subordinate legislation, ordinance, rule, judgment, rule
            of law, order (interim or final), writ, decree, clearance,
            Authorizations, approval, directive, circular guideline, policy,
            requirement, code of practice or guidance note, or other
            governmental, regulatory, statutory, administrative restriction or
            any similar form of decision, or determination by, or any
            interpretation or administration of any of the foregoing by, any
            statutory or regulatory authority or government agency or any other
            authority, in each case having jurisdiction over the subject matter
            of this Agreement.
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  </>
);
export const termsData = [
  {
    id: 1,
    title: "DEFINITIONS",
    content: generateContent(),
  },
  {
    id: 2,
    title: "INTERPRETATION",
    content: generateContent(),
  },
  {
    id: 3,
    title: "ACCEPTANCE OF THE TERMS AND CONDITIONS",
    content: generateContent(),
  },
  {
    id: 4,
    title: "ACCESS TO THE SITE",
    content: generateContent(),
  },
  {
    id: 5,
    title: "SUBSCRIPTION PLANS",
    content: generateContent(),
  },
  {
    id: 6,
    title: "USER INFORMATION",
    content: generateContent(),
  },
  {
    id: 7,
    title: " RIGHTS OF NOBROKER",
    content: generateContent(),
  },
  {
    id: 8,
    title: "EUROPEAN UNION DATA PROTECTION RIGHTS",
    content: generateContent(),
  },
  {
    id: 9,
    title: "UNAUTHORIZED ACCESS",
    content: generateContent(),
  },
  {
    id: 10,
    title: "USE OF INFORMATION",
    content: generateContent(),
  },
];
export const privacyContent = () => (
  <Typography variant='body2'>
    We may collect information from you, through your use of the Website or by joining the Nobroker community on social media websites, or which is provided to one of our marketing partners or through any engagement with Nobroker. We may collect and process personal information provided by you, including but not limited to:
    <br />
    Information that you provide at the time of registration including any information that identifies or can be used to identify, contact or locate the user such as name, address, email address, property photos, bank details, and phone number.
    <br />
    Any data that is automatically captured by the Website such as your mobile phone operating system every computer / mobile device connected to the internet is given a domain name and a set of numbers that serve as that computer's Internet Protocol or “IP” address. When you request a page from any page within the Website, our web servers automatically recognize your domain name and IP address. The domain name and IP address reveal nothing personal about you other than the IP address from which you have accessed the Website.
  </Typography>
)
export const privacyData = [
  {
    id: 1,
    title: "COLLECTION OF INFORMATION",
    content: privacyContent(),
  },
  {
    id: 2,
    title: " USE OF THE INFORMATION COLLECTED",
    content: privacyContent(),
  },
  {
    id: 3,
    title: "SHARING OF INFORMATION",
    content: privacyContent(),
  },
  {
    id: 4,
    title: "SECURITY OF INFORMATION",
    content: privacyContent(),
  },
  {
    id: 5,
    title: "EXCLUSION",
    content: privacyContent(),
  },
  {
    id: 6,
    title: "DATA RETENTION",
    content: privacyContent(),
  },
  {
    id: 7,
    title: "RIGHT TO WITHDRAW CONSENT",
    content: privacyContent(),
  },
  {
    id: 8,
    title: "RIGHT TO CORRECTION",
    content: privacyContent(),
  },
  {
    id: 9,
    title: "ACCESS OUTSIDE INDIA",
    content: privacyContent(),
  },
  {
    id: 1,
    title: "NOTIFICATION OF CHANGES",
    content: privacyContent(),
  },
  {
    id: 10,
    title: "DEFINITIONS",
    content: privacyContent(),
  },
];
