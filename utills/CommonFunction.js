import moment from "moment";

function capitalLizeName(text) {
  let words = text?.split(" ");
  // Capitalize the first letter of each word
  let formattedName = words?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  // Join the words back into a string
  return formattedName?.join(" ");
}

function upperCaseName(text) {
  return text?.toUpperCase();
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function toCamelCase(input) {
  const words = input.split(/\s+/);
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return camelCaseWords.join('');
}

function transformDocuments(documents) {
  return documents.reduce((result, document) => {
    const { name, childSub } = document;
    const camelCaseName = toCamelCase(name);
    result[camelCaseName] = childSub;
    return result;
  }, {});
}

function transformDocumentsLocation(documents) {
  return documents.reduce((result, document) => {
    const { city, area } = document;
    result[city] = area;
    return result;
  }, {});
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const objectToQueryString = (obj) => {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return queryString;
};

const getApprovedDiscountPercentage = (pointsString, amountString) => {
  const points = parseFloat(pointsString.replace(/,/g, ""));
  const paidAmount = parseFloat(amountString.replace(/,/g, ""));
  const discountAmount = Number(points) - Number(paidAmount);
  return (discountAmount / points) * 100;
};

const formatDate = (dateString) => {
  return moment(dateString).format("Do MMMM, YYYY");
};

let formatDateAndDaysRemaining = (expiryDate) => {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysRemaining = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

  const day = expiry.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const nth = (d) => ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d - 20) % 10 < 1 ? d % 10 : 0] || "th";
  const formattedDate = `${day}${nth(day)} ${monthNames[expiry.getMonth()]}`;

  return `${formattedDate} (${daysRemaining} days remaining)`;
};

const formatAmount = (amount) => {
  const numericAmount = Number(amount.replace(/,/g, ''));
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

const formatPoints = (points) => {
  const numericAmount = Number(points.replace(/,/g, ''));
  return numericAmount.toLocaleString("en-IN");
};

export {
  upperCaseName,
  capitalLizeName,
  descendingComparator,
  getComparator,
  stableSort,
  objectToQueryString,
  getApprovedDiscountPercentage,
  formatDate,
  formatAmount,
  formatPoints,
  toCamelCase,
  transformDocuments,
  transformDocumentsLocation,
  formatDateAndDaysRemaining,
};
