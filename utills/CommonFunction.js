import { format } from "date-fns";
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

function formatNumber(number) {
  // Check if the number is greater than or equal to one crore
  if (number >= 10000000) {
    const crore = Math.floor(number / 10000000);
    return `crore`;
  }
  // Check if the number is greater than or equal to one lakh
  else if (number >= 100000) {
    const lakh = Math.floor(number / 100000);
    return `lakh`;
  }
  // Check if the number is greater than or equal to one thousand
  else if (number >= 1000) {
    const thousand = Math.floor(number / 1000);
    return `thousand`;
  }
  // Less than one thousand
  else {
    return `hundred`;
  }
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

const formattedCreatedAt = (dateString) => {
  return format(new Date(dateString), "dd MMM, yyyy, hh:mm aaa");
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
  // const numericAmount = Number(amount.replace(/,/g, ''));
  const numericAmount = Number(String(amount).replace(/,/g, ''));
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericAmount).replace("₹", "₹ ");
};

const formatPoints = (points) => {
  // const numericAmount = Number(points?.replace(/,/g, ''));
  const numericAmount = Number(String(points).replace(/,/g, ''));
  return numericAmount.toLocaleString("en-IN");
};


function formatNumberWithCommas(number) {
  // Convert the number to a string for easier manipulation
  let numberString = String(number);

  // Check if the number is negative and remove the negative sign temporarily
  let isNegative = false;
  if (numberString[0] === '-') {
    isNegative = true;
    numberString = numberString.slice(1);
  }

  // Separate the number into groups based on units
  let crores = '';
  let lakhs = '';
  let tenThousands = '';
  let thousands = '';
  let hundreds = '';

  if (numberString.length > 7) {
    crores = numberString.slice(0, -7);
    lakhs = numberString.slice(-7, -5);
    tenThousands = numberString.slice(-5, -3);
    thousands = numberString.slice(-3);
  } else if (numberString.length > 5) {
    lakhs = numberString.slice(0, -5);
    tenThousands = numberString.slice(-5, -3);
    thousands = numberString.slice(-3);
  } else if (numberString.length > 3) {
    tenThousands = numberString.slice(0, -3);
    thousands = numberString.slice(-3);
  } else {
    hundreds = numberString;
  }

  // Add commas to separate units
  crores = crores ? crores + ',' : '';
  lakhs = lakhs ? lakhs + ',' : '';
  tenThousands = tenThousands ? tenThousands + ',' : '';
  thousands = thousands ? thousands + ',' : '';
  hundreds = hundreds ? hundreds + ',' : '';

  // Combine the formatted parts and add back the negative sign if needed
  let formattedNumber = crores + lakhs + tenThousands + thousands + hundreds;
  if (isNegative) {
    formattedNumber = '-' + formattedNumber;
  }
  let finalValue = formattedNumber.replace(/,$/, '')
  return finalValue;
}

const yearList = Array.from(
  { length: 41 }, (_, index) => { return { label: index > 9 ? `20${index}` : `200${index}`, value: index > 9 ? `20${index}` : `200${index}` } })

const monthList = Array.from({ length: 12 }, (_, index) => {
  return {
    label: (index + 1).toString().padStart(2, '0'),
    value: (index + 1).toString().padStart(2, '0'),
  }
});

const getColorForProgressBar = (input) => {
  let data = parseInt(input)
  if (data > 70) {
    return 'success'
  } else if (data > 40) {
    return 'warning'
  } else {
    return 'error'
  }
}

const shortPriceFormatter = (value) => {
  const val = Math.abs(value)
  if (val >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`
  if (val >= 100000) return `${(value / 100000).toFixed(2)} Lac`
  if (val >= 1000) return `${(value / 1000).toFixed(2)}k`
  return value;
}

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
  formatNumber,
  toCamelCase,
  transformDocuments,
  formatNumberWithCommas,
  transformDocumentsLocation,
  formatDateAndDaysRemaining,
  formattedCreatedAt,
  yearList,
  monthList,
  getColorForProgressBar,
  shortPriceFormatter
};
