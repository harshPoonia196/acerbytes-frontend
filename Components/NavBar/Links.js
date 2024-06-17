import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PaymentIcon from '@mui/icons-material/Payment';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupIcon from '@mui/icons-material/Group';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LinkIcon from '@mui/icons-material/Link';
import StarsIcon from '@mui/icons-material/Stars';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export const companyName = 'AcreBytes';

export const listOfPages = {
  home: '/',
  login: '/login',
  pageNotFound: '/page-not-found',
  termsAndCondition: '/terms-and-condition',
  privacy: '/privacy',
  commonPropertyList: '/property-list',
  commonAllBrokers: '/all-brokers',
  commonEnquiries: '/generate-real-estate-leads-growth',
  userProfile: '/user/profile',
  userShortlist: '/user/shortlist',
  userMyConsultant: '/user/my-consultants',
  consultantProfile: '/consultant/profile',
  consultantRatings: '/consultant/review',
  consultantMyLeads: '/consultant/my-leads',
  suggestedLeads: '/consultant/suggested-leads',
  consultantLinks: '/consultant/my-links',
  consultantMyNotes: '/consultant/my-notes',
  consultantMakePayment: '/consultant/make-payment',
  consultantPaymentHistory: '/consultant/payment-history',
  consultantJoinNow: '/consultant/join-now',
  adminEnquiries: '/admin/enquiries',
  adminReviewedEnquiries: '/admin/reviewed-enquiries',
  adminOrdersRequest: '/admin/orders-request',
  adminCreditStatus: '/admin/credit-status',
  adminAddProperty: '/admin/add-property',
  adminPropertyList: '/admin/property-list',
  adminManageUser: '/admin/manage-user',
  adminManageConsultant: '/admin/manage-consultant',
  adminConsultantLinks: '/admin/links-consultant',
  adminUpdateProfileLinks: '/admin/updateProfile',
  adminUpdateConsultantProfileLinks: '/admin/updateConsultantProfile',
  approvalPendingPage: '/approval-pending',
};

export const CommonMenuList = [
  {
    label: 'Property listings',
    route: listOfPages.commonPropertyList,
    icon: <ListIcon fontSize="small" />,
  },
  {
    label: 'Property Consultant',
    route: listOfPages.commonAllBrokers,
    icon: <GroupIcon fontSize="small" />,
  },
];
export const ToBeRemoved = [
  {
    label: ' Leads growth (marketing)',
    route: listOfPages.commonEnquiries,
    icon: <TableRowsIcon fontSize="small" />,
  },
  // {
  //   label: "Page not found tbr",
  //   route: listOfPages.pageNotFound,
  //   icon: <CloseIcon fontSize="small" />,
  // },
];

export const UserMenuList = [
  {
    label: 'My Profile',
    route: listOfPages.userProfile,
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    label: 'Favourite Properties',
    route: listOfPages.userShortlist,
    icon: <ThumbUpIcon fontSize="small" />,
  },
  {
    label: 'My Consultants',
    route: listOfPages.userMyConsultant,
    icon: <GroupIcon fontSize="small" />,
  },
];

export const ConsultantMenuList = [
  {
    label: 'Consultant Profile',
    route: listOfPages.consultantProfile,
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    label: 'My Ratings',
    route: listOfPages.consultantRatings,
    icon: <StarsIcon fontSize="small" />,
  },
  {
    label: 'My Leads',
    route: listOfPages.consultantMyLeads,
    icon: <LeaderboardIcon fontSize="small" />,
  },
  {
    label: 'My Notes',
    route: listOfPages.consultantMyNotes,
    icon: <DescriptionIcon fontSize="small" />,
  },
  {
    label: 'Suggested Leads',
    route: listOfPages.suggestedLeads,
    icon: <PlaylistAddCheckIcon fontSize="small" />,
  },
  {
    label: 'My Properties Link',
    route: listOfPages.consultantLinks,
    icon: <LinkIcon fontSize="small" />,
  },
  {
    label: 'Payment history',
    route: listOfPages.consultantPaymentHistory,
    icon: <PaymentIcon fontSize="small" />,
  },
];

export const AdminMenuList = [
  {
    label: 'Leads received',
    route: listOfPages.adminEnquiries,
    icon: <RecentActorsIcon fontSize="small" />,
  },
  {
    label: 'Orders request',
    route: listOfPages.adminOrdersRequest,
    icon: <ShoppingCartCheckoutIcon fontSize="small" />,
  },
  {
    label: 'Credit Points status',
    route: listOfPages.adminCreditStatus,
    icon: <RequestQuoteIcon fontSize="small" />,
  },
  {
    label: 'Leads reviewed',
    route: listOfPages.adminReviewedEnquiries,
    icon: <ChecklistRtlIcon fontSize="small" />,
  },
  {
    label: 'Add Property',
    route: listOfPages.adminAddProperty,
    icon: <PlaylistAddIcon fontSize="small" />,
  },
  {
    label: 'Property List',
    route: listOfPages.adminPropertyList,
    icon: <ListAltIcon fontSize="small" />,
  },
  {
    label: 'Manage Users',
    route: listOfPages.adminManageUser,
    icon: <ManageAccountsIcon fontSize="small" />,
  },
  {
    label: 'Manage Consultants',
    route: listOfPages.adminManageConsultant,
    icon: <SupervisedUserCircleIcon fontSize="small" />,
  },
  {
    label: 'Consultant Links',
    route: listOfPages.adminConsultantLinks,
    icon: <LinkIcon fontSize="small" />,
  },
];

export const CSRMenuList = [
  {
    label: 'Leads received',
    route: listOfPages.adminEnquiries,
    icon: <RecentActorsIcon fontSize="small" />,
  },
];

export const SMRMenuList = [
  {
    label: 'Manage Consultants',
    route: listOfPages.adminManageConsultant,
    icon: <PlaylistAddIcon fontSize="small" />,
  },
];
