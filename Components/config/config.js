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
