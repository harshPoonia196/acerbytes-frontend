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

export const UserMenuList = [
  {
    label: "Listings",
    route: "/property-list",
    icon: <ListIcon fontSize="small" />,
  },
  {
    label: "My Profile",
    route: "/profile",
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    label: "Shortlisted",
    route: "/shortlist",
    icon: <ThumbUpIcon fontSize="small" />,
  },
  {
    label: "My Consultants",
    route: "/my-consultants",
    icon: <GroupIcon fontSize="small" />,
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

export const ConsultantMenuList = [
  {
    label: "My leads",
    route: "/my-leads",
    icon: <PlaylistAddCheckIcon fontSize="small" />,
  },
  {
    label: "Payment",
    route: "/payment",
    icon: <PaymentIcon fontSize="small" />,
  },
];

export const AdminMenuList = [
  {
    label: "Leads received",
    route: "/admin/enquiries",
    icon: <RecentActorsIcon fontSize="small" />,
  },
  {
    label: "Leads reviewed",
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
];

export const listOfPages = {
  consultantJoinNow: "/join-now",
};
