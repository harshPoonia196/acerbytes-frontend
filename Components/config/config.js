export const PAGINATION_LIMIT = 3;
export const PAGINATION_LIMIT_OPTIONS = [3, 5, 10, 25];
export const DEBOUNCE_TIMER = 300;

export const ROLE_CONSTANTS = {
  superAdmin: "superAdmin",
  admin: "admin",
  user: "user",
  broker: "broker"
}

export const ROLES = [
  {
    label: "superAdmin",
    value: "superAdmin",
    isVisible: false
  },
  {
    label: "admin",
    value: "admin",
    isVisible: true
  },
  {
    label: "user",
    value: "user",
    isVisible: true
  },
  {
    label: "broker",
    value: "broker",
    isVisible: true
  },
];
