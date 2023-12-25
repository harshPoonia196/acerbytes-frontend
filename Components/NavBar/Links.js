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
import CloseIcon from '@mui/icons-material/Close';

export const listOfPages = {
  home: '/',
  pageNotFound: 'page-not-found',
  commonPropertyList: "/property-list",
  commonAllBrokers: 'all-brokers',
  commonEnquiries: '/enquiries',
  userProfile: '/user/profile',
  userShortlist: '/user/shortlist',
  userMyConsultant: '/user/my-consultants',
  consultantJoinNow: "/join-now",
  adminEnquiries: '/admin/enquiries',
  adminAddProperty: '/admin/add-property',
  adminPropertyList: '/admin/property-list',
  adminManageUser: '/admin/manage-user',
  adminManageConsultant: '/admin/manage-consultant',
  adminConsultantLinks: '/admin/consultant-links',
};

export const CommonMenuList = [
  {
    label: "Listings",
    route: listOfPages.commonPropertyList,
    icon: <ListIcon fontSize="small" />,
  },
  {
    label: "Consultants",
    route: listOfPages.commonAllBrokers,
    icon: <GroupIcon fontSize="small" />,
  },
  {
    label: "Leads panel",
    route: listOfPages.commonEnquiries,
    icon: <TableRowsIcon fontSize="small" />,
  },
  {
    label: "Page not found",
    route: listOfPages.pageNotFound,
    icon: <CloseIcon fontSize="small" />,
  },
];

export const UserMenuList = [
  {
    label: "My Profile",
    route: listOfPages.userProfile,
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    label: "Favourite properties",
    route: listOfPages.userShortlist,
    icon: <ThumbUpIcon fontSize="small" />,
  },
  {
    label: "My Consultants",
    route: listOfPages.userMyConsultant,
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
    route: listOfPages.adminEnquiries,
    icon: <RecentActorsIcon fontSize="small" />,
  },
  {
    label: "Leads reviewed (No page yet)",
    route: "/leads",
    icon: <ChecklistRtlIcon fontSize="small" />,
  },
  {
    label: "Add Property",
    route: listOfPages.adminAddProperty,
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Property list",
    route: listOfPages.adminPropertyList,
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Manage User",
    route: listOfPages.adminManageUser,
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Manage Consultant",
    route: listOfPages.adminManageConsultant,
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: "Consultant links",
    route: listOfPages.adminConsultantLinks,
    icon: <LinkIcon fontSize="small" />,
  },

];


