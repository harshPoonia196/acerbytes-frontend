export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) return true;
  return false;
};

export const getLoggedInUser = () => {
  const userDetail = localStorage.getItem("userDetails");
  if (userDetail) return JSON.parse(userDetail);
  return null;
};

export const getItem = (key) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
};

export const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data || {}));
};

export const clearItem = (key) => {
  localStorage.removeItem(key);
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDetails");
  window.location.href = "/";
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return "";
};

export const getGoogleId = () => {
  if (typeof window !== "undefined") {
    let userDetail = JSON.parse(localStorage.getItem("userDetails"));
    return userDetail?.googleID || "";
  }
  return "";
};

const publicRoutes = ["/", "/login", '/property-list', '/all-brokers', '/enquiries', '/details/:id', "/consultant/make-payment",
  "/page-not-found", "/terms-and-condition", "/privacy", "/consultant/join-now", "/property-list/:location"];

const scopes = {
  user: {
    userProfile: true,
  },
};

export const checkUrlAccess = (isLogged, url, redirectUser, role) => {
  const isPublicRoute = publicRoutes.some(publicRoute => {
    if (publicRoute.includes("/:")) { // Handle dynamic routes
      const baseRoute = publicRoute.split("/:")[0];
      return url.startsWith(baseRoute);
    }
    return url === publicRoute;
  });

  if (!isLogged && !isPublicRoute) {
    redirectUser("/login");
  }
  if (isLogged) {
    if (url.includes("/admin") && role !== "admin" && role !== "superAdmin") {
      redirectUser("/");
    } else if (url.includes("/user") && role !== "user") {
      redirectUser("/");
    } else if (url.includes("/consultant") && role !== "broker") {
      redirectUser("/");
    }
  }
};

export const matchUserRole = (actualRole, matchingRole) => {
  return actualRole === matchingRole;
  // return true
};

export const authRole = (authorizedRole) => {
  let userDetail = getLoggedInUser();
  return authorizedRole === userDetail?.role;
  // return true
};

export const countryCodeFormating = (code = "") => {
  if (!code) {
    return "";
  }
  if (code.includes("+")) {
    return code;
  }

  return `+${code}`;
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
