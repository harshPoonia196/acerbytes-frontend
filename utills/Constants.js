import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

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
  { label: "Service details", value: "serviceDetails" },
  { label: "Interested cities", value: "interestedCities" },
  { label: "Budget", value: "budget" },
  // { label: 'Enquiries', value: 'enquiries' },
  // { label: 'Property Consultants', value: 'propertyConsultants' },
  { label: "Current address", value: "currentAddress" },
  { label: "Setting", value: "setting" },
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
    label: "Resale",
    value: "resale",
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
  },
  admin: {
    brokerList: "admin-broker-list",
  },
  user: {
    myConsultant: "my-consultant",
  },
};

export {
  listOfTabsInAddProperty,
  listOfConsultantProfileTab,
  listOfProfileTab,
  disablePersonalizeAdsOption,
  listOfPropertyDetailsTab,
  reactQueryKey,
};

export const generateContent = () => (
  <>
    <Typography variant="body1" sx={{ marginLeft: "1.5rem" }}>
      Unless otherwise specified, the capitalized terms shall have the meanings
      set out below:
    </Typography>
    <List>
      <ListItem disablePadding>
        <ListItemIcon
          sx={{ minWidth: "0px", marginRight: "10px", marginBottom: "1rem" }}
        >
          <FiberManualRecord
            fontSize="2px"
            style={{ color: "black", padding: "2px" }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body">
            <b>Account</b> - means and includes the account created on the Site,
            by the User, in accordance with the terms of the Agreement,
            registered with and approved by NoBroker.
          </Typography>
        </ListItemText>
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon
          sx={{ minWidth: "0px", marginRight: "10px", marginBottom: "1rem" }}
        >
          <FiberManualRecord
            fontSize="2px"
            style={{ color: "black", padding: "2px" }}
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
          sx={{ minWidth: "0px", marginRight: "10px", marginBottom: "100px" }}
        >
          <FiberManualRecord
            fontSize="2px"
            style={{ color: "black", padding: "2px" }}
          />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body1">
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
export const  privacyContent=()=>(
  <Typography  sx={{lineHeight:'1.5rem', p:"1rem"}} variant='body1'>
                     We may collect information from you, through your use of the Website or by joining the Nobroker community on social media websites, or which is provided to one of our marketing partners or through any engagement with Nobroker. We may collect and process personal information provided by you, including but not limited to:    
                     <br/>
                    Information that you provide at the time of registration including any information that identifies or can be used to identify, contact or locate the user such as name, address, email address, property photos, bank details, and phone number.
                     <br/>
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
