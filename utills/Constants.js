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
    myLeads: "broker-leads"
  },
  admin: {
    brokerList: "admin-broker-list",
  },
  user: {
    myConsultant: "my-consultant",
  },
};

const enquiryFormKey = "enquiryForm";
const propertyRedirectKey = "propertyRedirect";

export {
  listOfTabsInAddProperty,
  listOfConsultantProfileTab,
  listOfProfileTab,
  disablePersonalizeAdsOption,
  listOfPropertyDetailsTab,
  reactQueryKey,
  enquiryFormKey,
  propertyRedirectKey,
};
