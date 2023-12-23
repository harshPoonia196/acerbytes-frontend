import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListIcon from "@mui/icons-material/List";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PaymentIcon from "@mui/icons-material/Payment";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import GroupIcon from "@mui/icons-material/Group";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LinkIcon from '@mui/icons-material/Link';

export const CommonMenuList = [
  {
    label: "Listings",
    route: "/property-list",
    icon: <ListIcon fontSize="small" />,
  },
  {
    label: "Consultants",
    route: "/all-brokers",
    icon: <GroupIcon fontSize="small" />,
  },
  {
    label: "Leads panel",
    route: "/enquiries",
    icon: <TableRowsIcon fontSize="small" />,
  },
];

export const UserMenuList = [
  {
    label: "My Profile",
    route: "/buyers/profile",
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    label: "Favourite properties",
    route: "/shortlist",
    icon: <ThumbUpIcon fontSize="small" />,
  },
  {
    label: "My Consultants",
    route: "/my-consultants",
    icon: <GroupIcon fontSize="small" />,
  },
];

export const ConsultantMenuList = [
  {
    label: "Consultant Profile",
    route: "/consultant/profile",
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    label: "My leads",
    route: "/consultant/my-leads",
    icon: <PlaylistAddCheckIcon fontSize="small" />,
  },
  {
    label: "Suggested leads",
    route: "/consultant/my-leads",
    icon: <PlaylistAddCheckIcon fontSize="small" />,
  },
  {
    label: "My links",
    route: "/consultant/my-links",
    icon: <LinkIcon fontSize="small" />,
  },
  {
    label: "Payment history",
    route: "/consultant/make-payment",
    icon: <PaymentIcon fontSize="small" />,
  }
];

export const AdminMenuList = [
  {
    label: "Leads received",
    route: "/admin/enquiries",
    icon: <RecentActorsIcon fontSize="small" />,
  },
  {
    label: "Leads reviewed (No page yet)",
    route: "/leads",
    icon: <ChecklistRtlIcon fontSize="small" />,
  },
  {
    label: "Add Property",
    route: "/admin/add-property",
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Property list",
    route: "/admin/property-list",
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Manage User",
    route: "/admin/manage-user",
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Manage Consultant",
    route: "/admin/manage-consultant",
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Consultant links",
    route: "/admin/consultant-links",
    icon: <LinkIcon fontSize="small" />,
  },

];

export const listOfPages = {
  consultantJoinNow: "/join-now",
};
