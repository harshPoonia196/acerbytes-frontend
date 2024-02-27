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

const publicRoutes = ["/login"];

const scopes = {
    user: {
        userProfile: true,
    },
};

export const checkUrlAccess = (isLogged, url, redirectUser, role) => {
    if (!isLogged && !publicRoutes.includes(url)) {
      redirectUser("/login");
    }
    if (isLogged) {
      if (url.includes("/admin") && (role !== "admin" && role !== "superAdmin")) {
        redirectUser("/");
      } else if (url.includes("/user") && role !== "user") {
        redirectUser("/");
      } else if (url.includes("/consultant") && role !== "broker") {
        redirectUser("/");
      }
    }
};

export const matchUserRole = (actualRole, matchingRole) => {
    // return actualRole === matchingRole
};

export const authRole = (authorizedRole) => {
  let userDetail = getLoggedInUser();
  return authorizedRole === userDetail?.role;
};