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
  "/page-not-found", "/terms-and-condition", "/privacy", "/consultant/join-now", "/property-list/:location", "/:projectdetails"];

const scopes = {
  user: {
    userProfile: true,
  },
};

export const checkUrlAccess = (isLogged, url, redirectUser, role) => {
  const isPublicRoute = publicRoutes.some(publicRoute => {
    if (publicRoute.includes("/:")) {
      const parts = publicRoute.split("/:");
      const baseRoute = parts[0];
      if (parts.length === 2 && url.startsWith(baseRoute)) {
        const dynamicPart = url.substring(baseRoute.length + 1);
        return !dynamicPart.includes("/");
      }
      return false;
    }
    return url === publicRoute;
  });

  if (!isLogged && !isPublicRoute) {
    redirectUser("/login");
  }

  if (isLogged) {
    const urls = [
      { baseUrl: '/admin', access_roles: [{ sub_urls: [], role: 'admin' }, { sub_urls: [], role: 'superAdmin' }, { sub_urls: [], role: 'customerSupport' }, { sub_urls: ['manage-consultant', 'updateConsultantProfile'], role: 'sales' }] },
      { baseUrl: '/user', access_roles: [{ sub_urls: [], role: 'user' }] },
      { baseUrl: '/consultant', access_roles: [{ sub_urls: [], role: 'broker' }] }
    ]


    function isHasSubUrl(subUrl) {
      return url.includes(subUrl);
    }

    /* Returing to baseurl if user has not access */
    for (let i = 0, len = urls.length; i < len; i++) {
      const { baseUrl, access_roles = [] } = urls[i];
      if (url.includes(baseUrl)) {
        const data = access_roles.find(item => item.role === role);
        if (data) {
          const { sub_urls = [] } = data;
          if (sub_urls.length) {
            if (!sub_urls.some(isHasSubUrl)) {
              redirectUser("/");
              break
            };
          };
        } else {
          redirectUser("/");
          break;
        }
      }
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
export const validatePhoneNumber = (phoneNumber) => {
  console.log(phoneNumber, "valid")
  return (phoneNumber?.number?.toString().length === 10);
}