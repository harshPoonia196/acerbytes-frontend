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
      { baseUrl: '/admin', access_roles: [{ sub_urls: [], role: 'admin', home: '/', is_public_restric: false }, { sub_urls: [], role: 'superAdmin', home: '/', is_public_restric: false }, { sub_urls: ['enquiries', 'updateProfile'], role: 'customerSupport', home: '/admin/enquiries', is_public_restric: true }, { sub_urls: ['manage-consultant', 'updateConsultantProfile'], role: 'sales', home: '/admin/manage-consultant', is_public_restric: true }] },
      { baseUrl: '/user', access_roles: [{ sub_urls: [], role: 'user', home: '/', is_public_restric: false }] },
      { baseUrl: '/consultant', access_roles: [{ sub_urls: [], role: 'broker', home: '/', is_public_restric: false }] }
    ]


    function isHasSubUrl(subUrl) {
      return url.includes(subUrl);
    }

    /* Returing to baseurl if user has not access */
    for (let i = 0, len = urls.length; i < len; i++) {
      const { baseUrl, access_roles = [] } = urls[i],
        data = access_roles.find(item => item.role === role);
      if (data) {
        const { sub_urls = [], home = '', is_public_restric = false, role: user_role } = data;
        if (url.includes(baseUrl)) {
          if (sub_urls.length) {
            if (!sub_urls.some(isHasSubUrl)) {
              redirectUser(home);
            };
          };
        } else {
          if (isPublicRoute) {
            is_public_restric ? redirectUser(home) : redirectUser(url);
          } else {
            redirectUser(home);
          }
        }
        break;
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

export const ratingLabels = (rating) => {
  let value = '';

  if (rating > 0 && rating <= 1) {
    value = "Poor";
  }

  if (rating > 1 && rating <= 2) {
    value = "Average";
  }

  if (rating > 2 && rating <= 3) {
    value = "Good";
  }

  if (rating > 3 && rating <= 4) {
    value = "Very good";
  }

  if (rating > 4) {
    value = "Excellent";
  }

  return value;
};

export const maskPhoneNumber = (phoneNumber) => {
  // Check if the phoneNumber is valid
  if (phoneNumber.length !== 10) {
    return phoneNumber;
  }

  // Replace characters from index 2 to 9 with asterisks
  const maskedDigits = phoneNumber.slice(2, 9).replace(/\d/g, '*');

  // Concatenate the first two digits and masked digits
  const maskedNumber = phoneNumber.slice(0, 2) + maskedDigits;

  return maskedNumber;
}


export const constructPropertyUrl = (property) => {
  const overview = property?.overview;
  const location = property?.location;
  const brokerId = property?.propertyBroker?.[0]?._id ?? 'defaultBrokerId'

  const projectCategory = (overview?.projectCategory.trim() ?? 'category').replace(/\s+/g, '-');
  let projectType;
  if (overview?.projectType?.length > 0) {
      projectType = overview.projectType.map(type => type.value.trim().replace(/\s+/g, '-')).join("-");
  }
  const city = (location?.city.trim() ?? 'city').replace(/\s+/g, '-');
  const sector = (location?.sector.trim() ?? 'sector').replace(/\s+/g, '-');
  const area = (location?.area.trim() ?? 'area').replace(/\s+/g, '-');
  const projectName = (overview?.projectName.trim() ?? 'projectName').replace(/\s+/g, '-');

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

  return `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${brokerId}`;
};
