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

export const yearList = Array.from(
  { length: 41 }, (_, index) => { return { label: index > 9 ? `20${index}` : `200${index}`, value: index > 9 ? `20${index}` : `200${index}` } })

export const monthList = Array.from({ length: 12 }, (_, index) => {
  
  return {
  label: (index + 1).toString().padStart(2, '0'),
  value: (index + 1).toString().padStart(2, '0'),
}});

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